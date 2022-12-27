const textFields=document.querySelectorAll(".mdc-text-field");textFields.forEach((e=>{mdc.textField.MDCTextField.attachTo(e)}));const toggles=document.querySelectorAll(".toggle"),am=document.querySelector(".am"),pm=document.querySelector(".pm");toggles.forEach((e=>{e.addEventListener("click",(()=>{e.classList.toggle("checked");const t=e.firstElementChild;t.checked?(t.checked=!1,am.classList.add("checked"),pm.classList.remove("checked")):(t.checked=!0,am.classList.remove("checked"),pm.classList.add("checked"))}))}));const kengaku=document.getElementById("kengaku-form");let namae="",kana="",tel="",email="",date="",times="",comment="",reserveTimeStamp="";const d=new Date,limitDate=`${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,"0")}-${(d.getDate()+1).toString().padStart(2,"0")}`.replace(/\n|\r/g,""),limit=new Date(limitDate),limitTimeStamp=limit.getTime();let editFlag=!1,errorCounter=0;const checkLists=document.querySelectorAll(".validate");checkLists.forEach((e=>{e.addEventListener("blur",(()=>{const t=e.parentElement.previousElementSibling,n=e.parentElement.parentElement;if(e.value)if("date"===e.type){const o=new Date(e.value);reserveTimeStamp=o.getTime(),limitTimeStamp>reserveTimeStamp?(n.classList.add("error"),t.textContent="翌日以降の日付をご選択ください。"):(t.textContent="",n.classList.remove("error"),t.textContent="")}else t.textContent="",n.classList.remove("error"),t.textContent="";else n.classList.contains("error")||(n.classList.add("error"),t.textContent="未入力です。")}))}));let agreeFlag=!1;const roots=document.getElementsByTagName("html"),bodys=document.getElementsByTagName("body"),submitHolder=document.querySelector(".submit-holder"),certification=document.querySelector(".certification"),indicator=document.getElementById("indicator"),container=document.getElementById("overlay"),dialog=document.querySelector(".dialog"),policy=document.querySelector(".privacy-policy");let template_contents=document.getElementById("privacy-policy"),clone_contents=template_contents.content.cloneNode(!0);indicator.addEventListener("click",(async function(){if(editFlag){namae=document.getElementsByName("namae")[0].value,kana=document.getElementsByName("kana")[0].value,tel=document.getElementsByName("tel")[0].value,email=document.getElementsByName("email")[0].value,date=document.getElementsByName("date")[0].value,times=!0===document.getElementsByName("select-times")[0].checked?"午後":"午前",comment=document.getElementsByName("comment")[0].value;const e=new Date(date);if(reserveTimeStamp=e.getTime(),limitTimeStamp>reserveTimeStamp){const e=document.querySelector(".calender-holder"),t=document.querySelector(".calender-holder .error-message");return e.classList.add("error"),void(t.textContent="翌日以降の日付をご選択ください。")}for(roots[0].style.overflowY="hidden",bodys[0].appendChild(container);container.firstChild;)container.removeChild(container.firstChild);changeDialog()}else errorCounter=0,await checkLists.forEach((e=>{""===e.value&&(errorCounter++,e.parentElement.parentElement.classList.add("error"),e.parentElement.parentElement.firstElementChild.classList.add("error"),e.parentElement.parentElement.firstElementChild.textContent="未入力です"),e.blur()})),0===errorCounter?(namae=document.getElementsByName("namae")[0].value,kana=document.getElementsByName("kana")[0].value,tel=document.getElementsByName("tel")[0].value,email=document.getElementsByName("email")[0].value,date=document.getElementsByName("date")[0].value,times=!0===document.getElementsByName("select-times")[0].checked?"午後":"午前",comment=document.getElementsByName("comment")[0].value,roots[0].style.overflowY="hidden",bodys[0].appendChild(container),dialog.appendChild(clone_contents),container.classList.add("overlay"),dialog.setAttribute("open","true")):(confirm(`未入力が${errorCounter}つあります。`),errorCounter=0)}));const config={attributes:!0,childList:!0,subtree:!0},observer=new MutationObserver((function(e,t){for(const t of e)if("childList"===t.type){const e=document.getElementById("close-dialog"),t=document.getElementById("agreement");document.getElementById("confirm"),e.addEventListener("click",(()=>{if(!0===t.checked){for(agreeFlag=!0;container.firstChild;)container.removeChild(container.firstChild);changeDialog()}else container.remove();roots[0].style.overflowY="scroll"}))}}));observer.observe(dialog,config);const submitObserver=new MutationObserver((function(e,t){let n=null;for(const t of e)"childList"===t.type&&(n=document.querySelector(".submit"),cancelBtn=document.querySelector(".cancel"));cancelBtn.addEventListener("click",(()=>{roots[0].style.overflowY="scroll",indicator.textContent="送信内容の確認",!editFlag&&document.querySelector(".certification").remove(),editFlag=!0,dialog.remove(),container.remove()})),n.addEventListener("click",(async function(){await submition(),thanks()}))})),changeDialog=function(){submitObserver.observe(container,config);let e=document.getElementById("finished");const t=`<dialog class="dialog" open>\n                              <table class="sent-content">\n                              <caption>以下の内容で承ります。</caption>\n                              <tr>\n                                <th>【 お名前 】</th>\n                                <td>${namae}</td>\n                              </tr>\n                              <tr>\n                                <th>【 ふりがな 】</th>\n                                <td>${kana}</td>\n                              </tr>\n                              <tr>\n                                <th>【 電話番号 】</th>\n                                <td>${tel}</td>\n                              </tr>\n                              <tr>\n                                <th>【 メールアドレス 】</th>\n                                <td>${email}</td>\n                              </tr>\n                              <tr>\n                                <th>【 見学希望日 】</th>\n                                <td>${date}</td>\n                              </tr>\n                              <tr>\n                                <th>【 見学の時間帯 】</th>\n                                <td>${times}</td>\n                              </tr>\n                              <tr>\n                                <th>【 ご要望等 】</th>\n                                <td>${comment}</td>\n                              </tr>\n                              <tr>\n                                <td class="submit-holder" colspan="2">\n                                  <button type="button" id="cancel" class="cancel">入力画面に戻る</button>\n                                  <button type="submit" id="submit" class="submit">送信する</button>\n                                </td>\n                              </table>\n                            </dialog>`;e.innerHTML=t;const n=e.content.cloneNode(!0);editFlag&&dialog.remove(),container.appendChild(n)};function thanks(){const e=document.getElementById("apply"),t=document.getElementById("completion").content.cloneNode(!0);container.remove(),e.innerHTML="",e.appendChild(t),e.scrollIntoView({behavior:"smooth",block:"end",inline:"center"})}function submition(){const e=new FormData;e.set("【お名前】",namae),e.set("【ふりがな】",kana),e.set("【電話番号】",tel),e.set("【メールアドレス】",email),e.set("【見学希望日】",date),e.set("【見学時間帯】",times),e.set("【ご要望】",comment),window.confirm("送信します")&&fetch("https://formspree.io/f/xbjbnpeo",{method:"post",body:e,headers:{Accept:"application/json"}}).then((e=>e.json())).then((e=>{console.log(e),thanks()})).catch((e=>{console.error(e),thanks()}))}!function(e){const t=document.querySelector(".calender"),n=document.querySelector(".reserve");t.value=e,t.min=e,n.textContent=e}(limitDate);