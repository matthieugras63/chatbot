     var answer;

     /* Cette fonction gère l'envoi des messages dans le chat */
     function sendMessage(x,y){
      var message = document.getElementsByTagName('input')[0].value; /* Alloue à message la valeur du champs "input"*/
      document.getElementsByTagName('input')[0].value=null; /*réinitialise le champs une fois que l'on a submit */
      var verif = message.toUpperCase();
      if (verif === "BONJOUR" || verif === "COUCOU"){
        answer="Bonjour toi";
      } else if (verif === "COMMENT VAS TU?" || verif === "CA VA?"){
        answer="Impeccable merci et toi?"
      } else if (verif === "CA VA AUSSI"){
        answer = "Tout va pour le mieux alors"
      } else {
        answer="Je n'ai pas compris votre message";
      }
      var myMessage = document.createElement("p"); /* création d'un paragraphe, alloué a une variable*/
      myMessage.innerHTML = message; /* Inscription dans cette variable, contenant le paragraphe, la valeur de "message"*/
      myMessage.className = "me"; /* ajout de la classe "me" au paragraphe crée */
      document.getElementById('message').appendChild(myMessage); /* création de ce paragraphe dans le code HTML */
      document.getElementById('bot-typing').style.visibility="visible"; /* on fait afficher l paragraphe ayant l'id "bot-typing" */
      document.getElementById('bot-typing').innerHTML="Bot is writting <span>.</span><span>.</span><span>.</span>"; /* On donne la valeur "Bot is typing" à ce paragraphe , suivi de 3 span contenant les points qui seront animés */
      document.getElementById('bot-typing').style.fontSize="20px"; /* changement de la taille de la police */
      document.querySelector("span").id="dot1"; /* attribution des id aux span */
      document.querySelector("span+span").id="dot2";
      document.querySelector("span+span+span").id="dot3";
      animate(); /* lancement de la fonction animate, définie plus bas */
      var scroll = document.getElementById('message');
      scroll.scrollTop = scroll.scrollHeight; /* Récupère la taille de l'élément qui dépasse dans le scroll, et effectue un scroll bottom pour garder le chat en bas */
      setTimeout(function(){ /* TimeOut mis en place pour créer un différé dans la réponse du chatbot */
        var botAnswer = document.createElement("p"); /* même procédé qu'au dessus */
        botAnswer.innerHTML = answer;
        botAnswer.className = "bot";
        document.getElementById('message').appendChild(botAnswer);
        document.getElementById('bot-typing').style.visibility="hidden"; /* Une fois le message publié la phrase "bot is typing" passe en visibility: hidden */
        botAnswer.scrollBy(0,botAnswer.offsetHeight); /* On effectue un scroll automatique, de 0px en horizontal, et de la taille de la fenetre en vertical */
        var scroll2 = document.getElementById('message');
        scroll2.scrollTop = scroll2.scrollHeight;
      },1500); /* timeOut de 1500ms */
      input.addEventListener('input', isTyping); /* Ici, je relance un listener pour que l'evenement 'input' soit relancé après que le bot aie publié son message */
    }


    /* Cette fonction gère l'ouverture du chat au click sur le bouton en bas à droite */

    var openChat=document.getElementById('open-chat');
    openChat.addEventListener('click',function(){
      var chatDisplay = document.getElementById('chatbot').style.display;
      if (chatDisplay ==""){
        chatDisplay ="none";
      }
      if (chatDisplay === "none") {
        document.getElementById('chatbot').style.display = "block";
        document.getElementById('open-chat').innerHTML = "Fermer le chat";
      } else {
        document.getElementById('chatbot').style.display = "none";
        document.getElementById('open-chat').innerHTML = "Ouvrir le chat";
      }
    });


    /* Cete fonction vérifie quand l'utilisateur est en train d'écrire quelque chose dans l'input */

    var input = document.getElementById('input'); /* on attribue le premier sélecteur 'input' du code HTML à la variable input */
    input.addEventListener('input', isTyping); /* on attribue à ce sélecteur un évenement, qui se déclenche lorsqu'il y a une action effectuée sur un input. Cette action est la fonction "isTyping" */
    function isTyping(){
      document.getElementById('bot-typing').style.visibility="visible"; /* Si l'utilisateur est en train de modifier l'input en y ajoutant du texte, alors le paragraphe devient visible */
      document.getElementById('bot-typing').innerHTML="You are writting <span>.</span><span>.</span><span>.</span>"; /* On lui attribue la valeur "You are typing" */
      document.getElementById('bot-typing').style.fontSize="20px";
      document.querySelector("span").id="dot1";
      document.querySelector("span+span").id="dot2";
      document.querySelector("span+span+span").id="dot3";
      input.removeEventListener('input', isTyping); /* on retire l'evenement à chaque changement dans l'input pour éviter un restart de la fonction à chaque modifications */
      animate();

    }


    /* Cette fonction vérifie à chaque changement de valeur dans l'input si ce dernier est vide ou non */

    var isEmpty = document.getElementById('input');
    isEmpty.addEventListener('input', visible);
    function visible(){
      if (isEmpty.value == ""){
        document.getElementById('bot-typing').style.visibility="hidden";
      } else{
        document.getElementById('bot-typing').style.visibility="visible";
      }
    }

    /* Dans la fonction animate, j'effectue 3 translations successives pour faire déplacer les points :
     - Tu commences à 0px
     - Tu translates de 7 px vers le haut (en suivant l'axe Y)
     - Tu reviens à 0px

     Les translations ont une durée de 700 millisecondes, et des itérations infinies.
     Pour avoir cet effet de "vague", les points 2 et 3 auront un delay de 200ms chacun, ce qui retarde le lancement de la fonction */

     function animate(){
      document.getElementById('dot1').animate([
        {transform: 'translateY(0px)'},
        {transform: 'translateY(-7px)'},
        {transform: 'translateY(0px'}],
        {
          duration: 700,
          iterations: Infinity,
        });
      document.getElementById('dot2').animate([
        {transform: 'translateY(0px)'},
        {transform: 'translateY(-7px)'},
        {transform: 'translateY(0px'}],
        {
          duration: 700,
          iterations: Infinity,
          delay: 200
        });
      document.getElementById('dot3').animate([
        {transform: 'translateY(0px)'},
        {transform: 'translateY(-7px)'},
        {transform: 'translateY(0px'}],
        {
          duration: 700,
          iterations: Infinity,
          delay: 400
        });
    }
