# GoRestViewer


Applicazione che permette di visualizzare e modificare le informazioni dal sito https://gorest.co.in<br>
> [!IMPORTANT]
> Per funzionare l'applicazione ha bisogno di un token d'accesso che viene generato facendo il login al sito [Go Rest](https://gorest.co.in/my-account/access-tokens)<br>

All'apertura dell'applicazione verrà visualizzato un form di login, in cui l'utente dovrà inserire il token d'accesso.<br>
Dopo aver inserito il token correttamente si accede alla pagina con la lista degli utenti iscritti al sito.<br>
Avendo ottenuto l'accesso, l'applicazione permette di effettuare le seguenti operazioni:
- Scorrere la lista degli utenti e visualizza le informazioni minime (nome ed email)
- Creare un nuovo utente
- Cancellare un utente
- Vedere le informazioni di un utente (Compresi relativi post e commenti)
- Cercare un utente
- Creare un post
- Cercare un post
- Creare un commento
- Vedere la lista di tutti i post e relativi commenti

> [!IMPORTANT]
> Gli utenti, i post e i commenti creati possono essere visualizzati solo dall'utente che li ha creati

### Test
Per provare l'applicazione installare i pacchetti npm e lanciare l'applicazione in locale con ng serve
