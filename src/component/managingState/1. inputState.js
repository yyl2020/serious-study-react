/**
 * 声明式(declarative UI) vs 命令式(imperative UI)
*/
// 命令式UI: 编写确切的指令来操作UI，告诉脚手架如何更新UI

{/* <form id="form">
  <textarea id="textarea"></textarea>
  <br>
  <button id="button" disabled>Submit</button>
  <p id="loading" style="display: none">Loading...</p>
  <p id="error" style="display: none; color: red;"></p>
</form>
<h1 id="success" style="display: none">Thank you!</h1> */}
let form = document.getElementById('form');
let textarea = document.getElementById('textarea');
let button = document.getElementById('button');
let loadingMessage = document.getElementById('loading');
let errorMessage = document.getElementById('error');
let successMessage = document.getElementById('success');
form.onsubmit = handleFormSubmit;
textarea.oninput = handleTextareaChange;

async function handleFormSubmit(e) {
    e.preventDefault();
    disable(textarea);
    disable(button);
    show(loadingMessage);
    hide(errorMessage);
    try {
      await submitForm();
      show(successMessage);
      hide(form);
    } catch (err) {
      show(errorMessage);
      errorMessage.textContent = err.message;
    } finally {  
      hide(loadingMessage);
      enable(textarea);
      enable(button);
    }
  }
  
  function handleTextareaChange() {
    if (textarea.value.length === 0) {
      disable(button);
    } else {
      enable(button);
    }
  }
  
  function hide(el) {
    el.style.display = 'none';
  }
  
  function show(el) {
    el.style.display = '';
  }
  
  function enable(el) {
    el.disabled = false;
  }
  
  function disable(el) {
    el.disabled = true;
  }
  
  function submitForm() {
    // Pretend it's hitting the network.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let shouldError = Math.random() > 0.5;
        if (shouldError) {
          reject(new Error('Something went wrong'));
        } else {
          resolve();
        }
      }, 1500);
    });
  }
  // 声明式UI：React中不直接操作UI，声明要显示的内容，React会弄清楚如何更新UI。
  // 1. 识别(Identify)组件的不同视觉状态
  export function FeedbackForm({
    status = 'empty'
  }) {
    if (status === 'success') {
      return <h1>Thank you!</h1>
    }
    return (
      <form>
        <textarea disabled={
            status === 'submitting'
        }/>
        <br />
        <button disabled={
            status === 'empty' ||
            status === 'submitting'
        }>
          Submit
        </button>
        {status === 'error' &&
        <p className="Error">
          Something went wrong
        </p>
        }
      </form>
    )
  }
  let statuses = [
    'empty',
    'typing',
    'submitting',
    'success',
    'error',
  ];
export function example() { // 展示多种视觉状态,又称为 “living styleguides” or “storybooks.”
    return (
      <>
        {statuses.map(status => (
          <section key={status}>
            <h4>FeedbackForm ({status}):</h4>
            <FeedbackForm status={status} />
          </section>
        ))}
      </>
    );
  }
  // 2. 确定(Determine)是什么触发这些状态变化，通常有两种人为触发、计算机触发
  // 所有触发器都必须设置 State 变量以更新UI

  // 3. 使用useState代表(Represent)state，设置尽可能少的state。
  // 如果不能立刻想到最好的办法设置 state，先列出可能的state，然后再重构state
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState(null);
//   const [isEmpty, setIsEmpty] = useState(true);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [isError, setIsError] = useState(false);
  // 4. 删除(Remove)不必要的状态变量
  // 这种状态会引起悖论吗？相同的信息是否已经在另一个状态变量中可用？能从另一个状态变量的逆中得到相同的信息吗？
  // 然后剩下这些state
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState(null);
//   const [status, setStatus] = useState('typing');
  // 5. 将事件处理程序与 set state 连接(Connect)一起
  export function FeedbackForm2() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('typing');
  
    if (status === 'success') {
      return <h1>Thank you!</h1>
    }
  
    async function handleSubmit(e) {
      e.preventDefault();
      setStatus('submitting');
      try {
        await submitForm();
        setStatus('success');
      } catch (err) {
        setStatus('typing');
        setError(err);
      }
    }
  
    function handleTextareaChange(e) {
      setMessage(e.target.value);
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={
          message.length === 0 ||
          status === 'submitting'
        }>
          Submit
        </button>
        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
      </form>
    );
  }
  
  function submitForm() {
    // Pretend it's hitting the network.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let shouldError = Math.random() > 0.5;
        if (shouldError) {
          reject(new Error('Something went wrong'));
        } else {
          resolve();
        }
      }, 1500);
    });
  }
  