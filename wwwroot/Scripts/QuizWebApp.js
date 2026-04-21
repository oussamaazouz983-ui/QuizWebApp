import Runtime from "./WebSharper.Core.JavaScript/Runtime.js"
Runtime.ScriptBasePath="/Scripts/";
import { Lazy, Create } from "./WebSharper.Core.JavaScript/Runtime.js"
function Main(){
  showStartScreen();
}
function showStartScreen(){
  clear();
  const title=globalThis.document.createElement("h1");
  title.textContent="Quiz Web App";
  const subtitle=globalThis.document.createElement("h3");
  subtitle.textContent="Choose Category";
  root().appendChild(title);
  root().appendChild(subtitle);
  iter((c) => {
    const btn=createButton(c, () => {
      set_questions(filterQuestions(c));
      set_index(0);
      set_score(0);
      set_lastResult("");
      showQuestion();
    });
    root().appendChild(btn);
  }, ["All", "Math", "Programming", "Science", "Geography"]);
}
function clear(){
  root().innerHTML="";
}
function root(){
  return globalThis.document.getElementById("main");
}
function createButton(txt, onClick){
  const btn=globalThis.document.createElement("button");
  btn.textContent=txt;
  btn.setAttribute("style", "display:block;margin:5px;padding:10px;width:100%");
  btn.addEventListener("click", onClick);
  return btn;
}
function set_questions(_1){
  _c.questions=_1;
}
function filterQuestions(category){
  return category=="All"?allQuestions():filter((q) => q.Category==category, allQuestions());
}
function set_index(_1){
  _c.index=_1;
}
function set_score(_1){
  _c.score=_1;
}
function set_lastResult(_1){
  _c.lastResult=_1;
}
function showQuestion(){
  clear();
  if(index()>=length(questions()))showResult();
  else {
    const q=get(questions(), index());
    const title=globalThis.document.createElement("h1");
    title.textContent="Quiz Web App";
    const progress=globalThis.document.createElement("h3");
    progress.textContent="Question "+String(index()+1)+" / "+String(length(questions()));
    const feedback=globalThis.document.createElement("p");
    feedback.textContent=lastResult();
    const question=globalThis.document.createElement("h2");
    question.textContent=q.Text;
    root().appendChild(title);
    root().appendChild(progress);
    root().appendChild(feedback);
    root().appendChild(question);
    iteri((_1, _2) => {
      const btn=createButton(_2, () => {
        _1===q.Correct?(set_score(score()+1),set_lastResult("Correct!")):set_lastResult("Wrong!");
        set_index(index()+1);
        showQuestion();
      });
      root().appendChild(btn);
    }, q.Answers);
  }
}
function allQuestions(){
  return _c.allQuestions;
}
function index(){
  return _c.index;
}
function questions(){
  return _c.questions;
}
function showResult(){
  clear();
  const title=globalThis.document.createElement("h1");
  title.textContent="Quiz Finished";
  const result=globalThis.document.createElement("h2");
  result.textContent="Score: "+String(score())+" / "+String(length(questions()));
  const percent=score()/length(questions())*100;
  const percentText=globalThis.document.createElement("h3");
  percentText.textContent="Percentage: "+String(percent)+"%";
  const msg=globalThis.document.createElement("h3");
  msg.textContent=percent>=80?"Excellent!":percent>=50?"Good!":"Try again!";
  const restartBtn=createButton("Restart", () => {
    set_index(0);
    set_score(0);
    set_lastResult("");
    showStartScreen();
  });
  root().appendChild(title);
  root().appendChild(result);
  root().appendChild(percentText);
  root().appendChild(msg);
  root().appendChild(restartBtn);
}
function lastResult(){
  return _c.lastResult;
}
function score(){
  return _c.score;
}
function FailWith(msg){
  throw new Error(msg);
}
function iter(f, arr){
  for(let i=0, _1=arr.length-1;i<=_1;i++)f(arr[i]);
}
function filter(f, arr){
  const r=[];
  for(let i=0, _1=arr.length-1;i<=_1;i++)if(f(arr[i]))r.push(arr[i]);
  return r;
}
let _c=Lazy((_i) => class $StartupCode_Client {
  static {
    _c=_i(this);
  }
  static lastResult;
  static score;
  static index;
  static questions;
  static allQuestions;
  static {
    this.allQuestions=[New("2+2?", ofArray(["3", "4", "5", "6"]), 1, "Math"), New("5*3?", ofArray(["10", "15", "20", "25"]), 1, "Math"), New("10/2?", ofArray(["2", "3", "5", "6"]), 2, "Math"), New("Capital of France?", ofArray(["Berlin", "Paris", "Rome", "Madrid"]), 1, "Geography"), New("HTML stands for?", ofArray(["HyperText Markup Language", "HighText Machine Language", "None", "Tool"]), 0, "Programming"), New("CSS used for?", ofArray(["Style", "Logic", "DB", "Server"]), 0, "Programming"), New("Water formula?", ofArray(["H2O", "CO2", "O2", "NaCl"]), 0, "Science"), New("Sun is?", ofArray(["Planet", "Star", "Moon", "Rock"]), 1, "Science"), New("Largest planet?", ofArray(["Earth", "Mars", "Jupiter", "Venus"]), 2, "Science")];
    this.questions=allQuestions();
    this.index=0;
    this.score=0;
    this.lastResult="";
  }
});
function New(Text, Answers, Correct, Category){
  return{
    Text:Text, 
    Answers:Answers, 
    Correct:Correct, 
    Category:Category
  };
}
function get(arr, n){
  checkBounds(arr, n);
  return arr[n];
}
function length(arr){
  return arr.dims===2?arr.length*arr.length:arr.length;
}
function checkBounds(arr, n){
  if(n<0||n>=arr.length)FailWith("Index was outside the bounds of the array.");
}
function iteri(f, l){
  let r=l;
  let i=0;
  while(r.$==1)
    {
      f(i, head(r));
      r=tail(r);
      i=i+1;
    }
}
function ofArray(arr){
  let r=FSharpList.Empty;
  for(let i=length(arr)-1, _1=0;i>=_1;i--)r=FSharpList.Cons(get(arr, i), r);
  return r;
}
function head(l){
  return l.$==1?l.$0:listEmpty();
}
function tail(l){
  return l.$==1?l.$1:listEmpty();
}
function listEmpty(){
  return FailWith("The input list was empty.");
}
class Object_1 { }
class FSharpList {
  static Empty=Create(FSharpList, {$:0});
  static Cons(Head, Tail){
    return Create(FSharpList, {
      $:1, 
      $0:Head, 
      $1:Tail
    });
  }
  $;
  $0;
  $1;
}
class Exception extends Object_1 { }
Main();

