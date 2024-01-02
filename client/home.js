var emailSignUp = document.querySelector(".email-sign-up");
var emailSignUpTy = document.querySelector(".email-sign-up-ty");
var userEmail = document.querySelector("#signup-input");
var signUpBtn = document.querySelector("#sign-up");

signUpBtn.addEventListener("click", getUserEmail);

function getUserEmail() {
  if (userEmail.value == "") return;
  emailSignUp.remove();
  emailSignUpTy.innerHTML="Thank you " + userEmail.value + " for signing up!";
}

function onClickOrder(){
document.location = 'menu.html'; 
}

function onClickSend()
{
  let name = document.querySelector('#name-input');
  let email = document.querySelector('#email-input');
  let phoneNum = document.querySelector('#phoneNum-input');
  let Message = document.querySelector('#Message-input');


  if (name.value == "" || email.value == "" || Message.value == ""  )
   {
    alert("Please enter name, email and message.");
   }
   else
   {
    name.value='';
    email.value='';
    phoneNum.value='';
    Message.value='';
    alert("Message sent! We will contact you ASAP.");
   }
}