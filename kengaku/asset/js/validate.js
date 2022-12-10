//
// Material Design Component
//

/** Instantiate single textfield component rendered in the document */
const textFields = document.querySelectorAll('.mdc-text-field');
textFields.forEach((textField) => {
  mdc.textField.MDCTextField.attachTo(textField);
});
//Toggle Switch
const toggles = document.querySelectorAll('.toggle');
toggles.forEach((toggle) => {
  toggle.addEventListener('click', ()=>{
    toggle.classList.toggle('checked');
    const toggleInput = toggle.firstElementChild;
    if(!toggleInput.checked) {
      toggleInput.checked = true;
    } else {
      toggleInput.checked = false;
    }
  })
})



//
//Form Validation ~ Submition
//

//
// Form Element
//
let name    = '';
let kana    = '';
let tel     = '';
let email   = '';
let date    = '';
let times   = '';
let comment = '';

// Edit Flag (送信画面から入力画面への戻り)
let editFlag = false;

//
// Validation ( Error Check )
//
let errorCounter = 0;
const checkLists = document.querySelectorAll('.validate');
checkLists.forEach((checkList)=>{
  checkList.addEventListener('blur', ()=>{
    const message = checkList.parentElement.previousElementSibling;
    const warning = checkList.parentElement.parentElement;
    if(!checkList.value) {
      warning.classList.add('error');
      message.textContent = '未入力です。';
      errorCounter++;
    }else {
      message.textContent = '';
      errorCounter = 0; //reset
      //error warning reset
      warning.classList.remove('error');
      message.textContent = '';
    }
    //console.log(errorCounter);
  });
});

//
// Confirm ～ Submit
//
let agreeFlag = false;
const roots           = document.getElementsByTagName('html');
const bodys           = document.getElementsByTagName('body');
const submitHolder    = document.querySelector('.submit-holder');
const certification   = document.querySelector('.certification');
const indicator       = document.getElementById('indicator');
const container       = document.getElementById('overlay');
const dialog          = document.querySelector('.dialog');
const policy          = document.querySelector('.privacy-policy');
let template_contents = document.getElementById('privacy-policy');
let clone_contents    = template_contents.content.cloneNode(true);

//
indicator.addEventListener('click', async function() {
  if(!editFlag) { /** 確認画面からの戻りでなければ */
    /** 確認ボタンがクリックされたとき全てのフォーカスを外す */
    await checkLists.forEach((checkList) => {
      if(checkList.value === '') {
        errorCounter++;
        checkList.parentElement.parentElement.classList.add('error');
        checkList.parentElement.parentElement.firstElementChild.classList.add('error');
        checkList.parentElement.parentElement.firstElementChild.textContent = '未入力です';
      }
      // 
      checkList.blur();
      //console.log(errorCounter);
    });
    /** 未入力がなければダイアログを表示する */
    if(errorCounter === 0) {
      /** formの値の取得 */
      name    = document.getElementsByName('name')[0].value;
      kana    = document.getElementsByName('kana')[0].value;
      tel     = document.getElementsByName('tel')[0].value;
      email   = document.getElementsByName('email')[0].value;
      date    = document.getElementsByName('date')[0].value;
      times   = (document.getElementsByName('select-times')[0].checked === true) ? '午後' : '午前';
      comment = document.getElementsByName('comment')[0].value;

      roots[0].style.overflowY = 'hidden';//Scroll Rock
      bodys[0].appendChild(container);
      dialog.appendChild(clone_contents);
      container.classList.add('overlay');
      dialog.setAttribute('open', 'true');
    }else {
      confirm(`未入力が${errorCounter}つあります。`);
      errorCounter = 0; //reset
    }
  } else { /** 確認画面からの戻りの場合 */
    //console.log('再編集画面');

    /** formの値の再取得 */
    name    = document.getElementsByName('name')[0].value;
    kana    = document.getElementsByName('kana')[0].value;
    tel     = document.getElementsByName('tel')[0].value;
    email   = document.getElementsByName('email')[0].value;
    date    = document.getElementsByName('date')[0].value;
    times   = (document.getElementsByName('select-times')[0].checked === true) ? '午後' : '午前';
    comment = document.getElementsByName('comment')[0].value;

    roots[0].style.overflowY = 'hidden';//Scroll Rock
    bodys[0].appendChild(container);

    /** コンテナの初期化 */
    while(container.firstChild){
      container.removeChild(container.firstChild);
    }

    /** Mutation */
    changeDialog();
  }
});

// Agreement Modal Dialog Mutation Observe 
const config = { attributes: true, childList: true, subtree: true };
const observer = new MutationObserver(
  function(mutationsList, observer) {
    for(const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const closeDialog = document.getElementById('close-dialog');
        const agreement   = document.getElementById('agreement');
        const confirmBtn  = document.getElementById('confirm');
        closeDialog.addEventListener('click', ()=>{
          if(agreement.checked === true) {
            agreeFlag = true;
            //console.log(agreeFlag);

            /** 初期化 */
            while(container.firstChild){
              container.removeChild(container.firstChild);
            }
            /** 最終確認画面に切り替え */
            changeDialog(); 
          } else {
            /** モーダルウィンドウを廃棄して入力画面に戻る */
            container.remove();
          }
          /** Reset Scroll Rock */
          roots[0].style.overflowY = 'scroll';
        });
      }
    }
  }
);
observer.observe(dialog, config);

//Submition Mutation Observe
const submitObserver = new MutationObserver(
  function(mutationList, observer) {
    let submitBtn = null;
    for(const mutation of mutationList) {
      if(mutation.type === 'childList') {
        //console.log(mutation.addedNodes[0]);
        submitBtn = document.querySelector('.submit');
        cancelBtn = document.querySelector('.cancel');
      }
    }

    /** 入力画面へ戻る */
    cancelBtn.addEventListener('click', ()=>{
      roots[0].style.overflowY = 'scroll';
      indicator.textContent = '送信内容の確認';
      editFlag ? '' : document.querySelector('.certification').remove();
      editFlag = true;
      dialog.remove();
      container.remove();
      //console.log('Cancel Button Clicked!');
    });

    /** 送信処理 ～ 完了画面表示 */
    submitBtn.addEventListener('click', 
      async function(){
        await submition();
        //thanks();
      }
    );
  }
);

// Certification
const changeDialog = function() { 
  submitObserver.observe(container, config);
  let template_finished = document.getElementById('finished');
  const finishedContents = `<dialog class="dialog" open>
                              <table class="sent-content">
                              <caption>以下の内容で承ります。</caption>
                              <tr>
                                <th>【 お名前 】</th>
                                <td>${name}</td>
                              </tr>
                              <tr>
                                <th>【 ふりがな 】</th>
                                <td>${kana}</td>
                              </tr>
                              <tr>
                                <th>【 電話番号 】</th>
                                <td>${tel}</td>
                              </tr>
                              <tr>
                                <th>【 メールアドレス 】</th>
                                <td>${email}</td>
                              </tr>
                              <tr>
                                <th>【 見学の時間帯 】</th>
                                <td>${times}</td>
                              </tr>
                              <tr>
                                <th>【 ご要望等 】</th>
                                <td>${comment}</td>
                              </tr>
                              <tr>
                                <td class="submit-holder" colspan="2">
                                  <button type="button" id="cancel" class="cancel">入力画面に戻る</button>
                                  <button type="button" id="submit" class="submit">送信する</button>
                                </td>
                              </table>
                            </dialog>`;
  
  template_finished.innerHTML = finishedContents;
  const clone_finished = template_finished.content.cloneNode(true);
  editFlag ? dialog.remove() : ''; /** 再編集時には「送信内容の表示」画面切り替え時に「指針画面」を削除する */
  container.appendChild(clone_finished);
}

// Completion
function thanks() {
  const apply               = document.getElementById('apply');
  const template_completion = document.getElementById('completion');
  const clone_completion    = template_completion.content.cloneNode(true);

  container.remove();
  apply.innerHTML = '';
  apply.appendChild(clone_completion);

  apply.scrollIntoView({
		behavior : 'smooth',
		block    : 'end',
		inline   : 'center'
	});
}

function submition(e) {
  /** FormDataオブジェクトの初期化 */
  const fd = new FormData();

  /** FormDataオブジェクトにデータをセット */
  fd.set('name', name.value);
  fd.set('kana', kana.value);
  fd.set('tel', tel.value);
  fd.set('email', email.value);
  fd.set('date', date.value);
  fd.set('times', times.value);
  fd.set('comment', comment.value);
  console.table(fd);

  /** フォームの入力値を送信 */
  /*
  if(window.confirm('送信します')) {
    fetch( 'https://formspree.io/f/xbjbnpeo', {
      method: 'POST',
      body: fd,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      thanks();
    })
    .catch((error) => {
      console.error(error);
      thanks();
    });
  }
  */
}


/** カレンダー（翌日以降のみ指定可） */
(function startDate() {
  
  const d = new Date();
  
  /** 日付を文字列にフォーマットする */
  const formatted = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2, '0')}-${(d.getDate()+1).toString().padStart(2, '0')}`.replace(/\n|\r/g, '');

  const calender = document.querySelector('.calender');
  const reserve  = document.querySelector('.reserve');
  calender.min = formatted;
  reserve.textContent = formatted;

  //console.log(formatted);
})();