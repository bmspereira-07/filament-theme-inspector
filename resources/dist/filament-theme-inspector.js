// resources/js/index.js
function createPopup() {
  const popup2 = document.createElement("div");
  popup2.classList.add("theme-inspector");
  const textNode2 = document.createElement("span");
  textNode2.classList.add("class-text");
  popup2.appendChild(textNode2);
  const copyButton = document.createElement("button");
  const copyIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="fi-btn-icon transition duration-75 h-5 w-5 text-gray-400 dark:text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
        </svg>`;
  copyButton.innerHTML = copyIcon;
  const checkmarkSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="fi-btn-icon transition duration-75 h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12l5 5L19 7" />
        </svg>`;
  copyButton.addEventListener("click", () => {
    const textToCopy = textNode2.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
      copyButton.innerHTML = checkmarkSVG;
      setTimeout(() => {
        copyButton.innerHTML = copyIcon;
      }, 2e3);
    }).catch((err) => console.error("Failed to copy: ", err));
  });
  popup2.appendChild(copyButton);
  document.body.appendChild(popup2);
  return { popup: popup2, textNode: textNode2 };
}
function showPopup(popup2, textNode2, text, x, y) {
  textNode2.textContent = text;
  popup2.style.left = `${x + 10}px`;
  popup2.style.top = `${y + 10}px`;
  popup2.classList.add("is-visible");
  const popupRect = popup2.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  if (popupRect.right > viewportWidth) {
    popup2.style.left = `${viewportWidth - popupRect.width - 10}px`;
  }
  if (popupRect.left < 0) {
    popup2.style.left = "10px";
  }
  if (popupRect.bottom > viewportHeight) {
    popup2.style.top = `${y - popupRect.height - 10}px`;
  }
}
function hidePopup(popup2) {
  popup2.classList.remove("is-visible");
}
var { popup, textNode } = createPopup();
var isFrozen = false;
document.body.addEventListener("mouseenter", (e) => {
  if (e.target.matches('[class*="fi-"]') && !isFrozen) {
    const cls = Array.from(e.target.classList).find((c) => c.startsWith("fi-"));
    showPopup(popup, textNode, cls, e.clientX, e.clientY);
  }
}, true);
document.body.addEventListener("mouseleave", (e) => {
  if (e.target.matches('[class*="fi-"]') && !isFrozen) {
    hidePopup(popup);
  }
}, true);
document.addEventListener("keydown", (e) => {
  if (e.altKey) {
    isFrozen = true;
    popup.style.pointerEvents = "auto";
  }
});
document.addEventListener("keyup", (e) => {
  if (e.key === "Alt" || e.key === "Meta")
    isFrozen = false;
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vanMvaW5kZXguanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIlxuZnVuY3Rpb24gY3JlYXRlUG9wdXAoKSB7XG5cbiAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3RoZW1lLWluc3BlY3RvcicpO1xuXG5cbiAgICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB0ZXh0Tm9kZS5jbGFzc0xpc3QuYWRkKCdjbGFzcy10ZXh0Jyk7XG4gICAgcG9wdXAuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuXG4gICAgY29uc3QgY29weUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gICAgY29uc3QgY29weUljb24gPSBgXG4gICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzPVwiZmktYnRuLWljb24gdHJhbnNpdGlvbiBkdXJhdGlvbi03NSBoLTUgdy01IHRleHQtZ3JheS00MDAgZGFyazp0ZXh0LWdyYXktNTAwXCI+XG4gICAgICAgICAgICA8cGF0aCBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE1Ljc1IDE3LjI1djMuMzc1YzAgLjYyMS0uNTA0IDEuMTI1LTEuMTI1IDEuMTI1aC05Ljc1YTEuMTI1IDEuMTI1IDAgMCAxLTEuMTI1LTEuMTI1VjcuODc1YzAtLjYyMS41MDQtMS4xMjUgMS4xMjUtMS4xMjVINi43NWE5LjA2IDkuMDYgMCAwIDEgMS41LjEyNG03LjUgMTAuMzc2aDMuMzc1Yy42MjEgMCAxLjEyNS0uNTA0IDEuMTI1LTEuMTI1VjExLjI1YzAtNC40Ni0zLjI0My04LjE2MS03LjUtOC44NzZhOS4wNiA5LjA2IDAgMCAwLTEuNS0uMTI0SDkuMzc1Yy0uNjIxIDAtMS4xMjUuNTA0LTEuMTI1IDEuMTI1djMuNW03LjUgMTAuMzc1SDkuMzc1YTEuMTI1IDEuMTI1IDAgMCAxLTEuMTI1LTEuMTI1di05LjI1bTEyIDYuNjI1di0xLjg3NWEzLjM3NSAzLjM3NSAwIDAgMC0zLjM3NS0zLjM3NWgtMS41YTEuMTI1IDEuMTI1IDAgMCAxLTEuMTI1LTEuMTI1di0xLjVhMy4zNzUgMy4zNzUgMCAwIDAtMy4zNzUtMy4zNzVIOS43NVwiIC8+XG4gICAgICAgIDwvc3ZnPmA7XG5cbiAgICBjb3B5QnV0dG9uLmlubmVySFRNTCA9IGNvcHlJY29uO1xuXG4gICAgY29uc3QgY2hlY2ttYXJrU1ZHID0gYFxuICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2U9XCJncmVlblwiIGNsYXNzPVwiZmktYnRuLWljb24gdHJhbnNpdGlvbiBkdXJhdGlvbi03NSBoLTUgdy01XCI+XG4gICAgICAgICAgICA8cGF0aCBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBkPVwiTTUgMTJsNSA1TDE5IDdcIiAvPlxuICAgICAgICA8L3N2Zz5gO1xuXG4gICAgY29weUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdGV4dFRvQ29weSA9IHRleHROb2RlLnRleHRDb250ZW50O1xuICAgICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0VG9Db3B5KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvcHlCdXR0b24uaW5uZXJIVE1MID0gY2hlY2ttYXJrU1ZHO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29weUJ1dHRvbi5pbm5lckhUTUwgPSBjb3B5SWNvbjtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9KS5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGNvcHk6ICcsIGVycikpO1xuICAgIH0pO1xuXG4gICAgcG9wdXAuYXBwZW5kQ2hpbGQoY29weUJ1dHRvbik7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb3B1cCk7XG4gICAgcmV0dXJuIHsgcG9wdXAsIHRleHROb2RlIH07XG59XG5cbmZ1bmN0aW9uIHNob3dQb3B1cChwb3B1cCwgdGV4dE5vZGUsIHRleHQsIHgsIHkpIHtcbiAgICB0ZXh0Tm9kZS50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgcG9wdXAuc3R5bGUubGVmdCA9IGAke3ggKyAxMH1weGA7XG4gICAgcG9wdXAuc3R5bGUudG9wID0gYCR7eSArIDEwfXB4YDtcbiAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdpcy12aXNpYmxlJylcblxuICAgIGNvbnN0IHBvcHVwUmVjdCA9IHBvcHVwLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHZpZXdwb3J0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgIGlmIChwb3B1cFJlY3QucmlnaHQgPiB2aWV3cG9ydFdpZHRoKSB7XG4gICAgICAgIHBvcHVwLnN0eWxlLmxlZnQgPSBgJHt2aWV3cG9ydFdpZHRoIC0gcG9wdXBSZWN0LndpZHRoIC0gMTB9cHhgO1xuICAgIH1cbiAgICBpZiAocG9wdXBSZWN0LmxlZnQgPCAwKSB7XG4gICAgICAgIHBvcHVwLnN0eWxlLmxlZnQgPSAnMTBweCc7XG4gICAgfVxuICAgIGlmIChwb3B1cFJlY3QuYm90dG9tID4gdmlld3BvcnRIZWlnaHQpIHtcbiAgICAgICAgcG9wdXAuc3R5bGUudG9wID0gYCR7eSAtIHBvcHVwUmVjdC5oZWlnaHQgLSAxMH1weGA7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBoaWRlUG9wdXAocG9wdXApIHtcbiAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdpcy12aXNpYmxlJyk7XG59XG5cbmNvbnN0IHsgcG9wdXAsIHRleHROb2RlIH0gPSBjcmVhdGVQb3B1cCgpO1xubGV0IGlzRnJvemVuID0gZmFsc2U7XG5cbmRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0Lm1hdGNoZXMoJ1tjbGFzcyo9XCJmaS1cIl0nKSAmJiAhaXNGcm96ZW4pIHtcbiAgICAgICAgY29uc3QgY2xzID0gQXJyYXkuZnJvbShlLnRhcmdldC5jbGFzc0xpc3QpLmZpbmQoYyA9PiBjLnN0YXJ0c1dpdGgoJ2ZpLScpKTtcbiAgICAgICAgc2hvd1BvcHVwKHBvcHVwLCB0ZXh0Tm9kZSwgY2xzLCBlLmNsaWVudFgsIGUuY2xpZW50WSk7XG4gICAgfVxufSwgdHJ1ZSk7XG5cbmRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0Lm1hdGNoZXMoJ1tjbGFzcyo9XCJmaS1cIl0nKSAmJiAhaXNGcm96ZW4pIHtcbiAgICAgICAgaGlkZVBvcHVwKHBvcHVwKTtcbiAgICB9XG59LCB0cnVlKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgaWYgKGUuYWx0S2V5KSB7XG4gICAgICAgIGlzRnJvemVuID0gdHJ1ZTtcbiAgICAgICAgcG9wdXAuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICB9XG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgIGlmIChlLmtleSA9PT0gJ0FsdCcgfHwgZS5rZXkgPT09ICdNZXRhJykgaXNGcm96ZW4gPSBmYWxz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
function p(){let e=document.createElement("div");return e.style.cssText=`
        position: fixed; 
        display: none; 
        z-index: 9999;`,document.body.appendChild(e),e}function f(e){let t=document.createElement("div");t.style.cssText=`
        background: rgba(0, 0, 0, 0.8); 
        padding: 10px 15px; 
        border-radius: 5px; 
        margin-left: 5px;
        margin-bottom: 10px;
        display: flex; 
        align-items: center;
        white-space: nowrap;           /* Prevent text wrapping */
        overflow: hidden;              /* Hide overflowed text */
        text-overflow: ellipsis;       /* Show ellipsis for overflowed text */
    `;let o=document.createElement("span");o.textContent=e,o.style.color="white",o.style.marginRight="10px";let n=document.createElement("button"),i=`
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="fi-btn-icon transition duration-75 h-5 w-5 text-gray-400 dark:text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
        </svg>`,r=`
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="fi-btn-icon transition duration-75 h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12l5 5L19 7" />
        </svg>`;return n.innerHTML=i,n.style.cssText=`
        background: rgba(0, 0, 0, 0.5); 
        color: white; 
        border: none; 
        cursor: pointer; 
        padding: 5px 10px; 
        font-size: 12px; 
        border-radius: 5px;`,n.addEventListener("click",()=>{navigator.clipboard.writeText(e).then(()=>{n.innerHTML=r,setTimeout(()=>{n.innerHTML=i},2e3)}).catch(a=>console.error("Failed to copy: ",a))}),t.appendChild(o),t.appendChild(n),t}function h(e,t,o,n){e.innerHTML="",t.forEach(c=>{let d=f(c);e.appendChild(d)}),e.style.left=`${o+10}px`,e.style.top=`${n+10}px`,e.style.display="flex";let i=e.getBoundingClientRect(),r=window.innerWidth,a=window.innerHeight;i.right>r&&(e.style.left=`${r-i.width-10}px`),i.left<0&&(e.style.left="10px"),i.bottom>a&&(e.style.top=`${n-i.height-10}px`)}function u(e){e.style.display="none"}var l=p(),s=!1;document.body.addEventListener("mouseenter",e=>{if(e.target.matches('[class*="fi-"]')&&!s){let t=Array.from(e.target.classList).filter(o=>o.startsWith("fi-"));t.length>0&&h(l,t,e.clientX,e.clientY)}},!0);document.body.addEventListener("mouseleave",e=>{e.target.matches('[class*="fi-"]')&&!s&&u(l)},!0);document.addEventListener("keydown",e=>{e.altKey&&(s=!0,l.style.pointerEvents="auto")});document.addEventListener("keyup",e=>{(e.key==="Alt"||e.key==="Meta")&&(s=!1)});

