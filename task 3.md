### 1. Simply describe what "function1" will do.

function1 是一個 Redux Saga 的 generator function， 透過 POST 的 HTTP 方法來做非同步請求。

- Redux 是全域狀態管理的套件，但不能處理非同步的執行，所以使用 React Saga 的功能來執行。
- ctrl 是一個 AbortController 的物件實例，可以中斷 fetch 的請求，並將該中斷請求的 signal 放在 config 中。
- config 是 fetch API 的參數，包含 HTTP method, end point, 請求的數據跟中斷訊號。
- function1 中處理了請求的成功、失敗以及最後執行結果，並分別會依據不同結果發起各自的 action 來更新狀態。
- yield 在 generator function 中會暫停函數執行並生成該如何操作的物件，這些物件會由 middleware 解析要執行什麼操作，如同題目中的 "call" effect 可以執行一個返回 POST method 的請求，完成後透過 "put" effect 發起一個 action 到 reducer 1 來更新 store 中的狀態。
- 請求錯誤與請求被中斷都會有透過 "put" effect 發起分別的 action 到 reducer 2, 3 來更新 store 中的狀態。

### 2. Can we stop what "function1" is doing? How?

可以的，ctrl 是一個 AbortController 的物件實例，可以中斷 fetch 的請求，若要中斷請求，可以調用 function2 ，此函式會調用 AbortController 的 abort 方法，並且發出中斷訊號，此時可能會拋出異常跳到 catch 區塊，最後會到 finally 區塊並透過 "put" effect 發起 action 到 reducer 3 來更新 store 中的狀態。

### 3. How to optimize this snippet?

### 程式碼優化：

1. 將全域變數 ctrl 改為區域變數，在 function1 內部宣告，並將 function2 加上 ctrl 的參數，如果未來在這隻檔案有其他 generator function 也需要做中斷時，仍然可以複用 function2，如下。

```jsx
function* function1(action) {
    const ctrl = new AbortController();
    
    function2(ctrl)
    ...
}

function function2(ctrl) {
    ctrl.abort();
}
```

1. 可以在請求 try 區塊中加入 while(true) ，持續呼叫 API，直到程式中斷或是特定條件被滿足。
https://redux-saga-in-chinese.js.org/docs/advanced/NonBlockingCalls.html

```jsx
function* function1(action) {
		...
    try {
		    while(true) {
	        const { data } = yield call(/** a axios request with config */);
	
	        yield put(/** reducer 1 */);
	      }
    }
    ...
}
```

1. 可以利用 Redux Saga 提供的 cancelled() 來檢查請求是否取消，最後在 finally 區塊中專門處理請求被取消的狀況。
[https://pjchender.dev/react/redux-saga/#使用-finally-和-cancelled-來處理被停止的-task](https://pjchender.dev/react/redux-saga/#%E4%BD%BF%E7%94%A8-finally-%E5%92%8C-cancelled-%E4%BE%86%E8%99%95%E7%90%86%E8%A2%AB%E5%81%9C%E6%AD%A2%E7%9A%84-task)

```jsx
function* function1(action) {
    ...
    finally {
	      if (yield cancelled()) {
	      // 如果此 Task 是被 cancel 的話，那麼則...
		    }
    }
}
```

### 功能優化：

1. 可以在請求錯誤時加上錯誤提示框 UI，並告知錯誤訊息，給予使用者更好的提示。
2. 可以在 Redux store 中建立一個 cached 的參數與資料，每一次 call 時會先比對 cached 的參數，減少伺服器請求與等待時間。