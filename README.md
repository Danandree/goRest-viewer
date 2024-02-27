# GoRestViewer

Applicazione che permette di visualizzare e modificare le informazioni dal server go.restApi.com
Per funzionare l'applicazione ha bisogno di un token d'accesso che viene generato facendo il login al sito https://go.restApi.com
All'apertura dell'applicazione verrà visualizzato un form di login, in cui l'utente dovrà inserire il token d'accesso.
Dopo aver inserito il token correttamente si accde alla pagina con la lista degli utenti iscritti al sito.
Da qua l'applicazione permette di effettuare le seguenti operazioni: <--
- Scorre la lista degli utenti e visualizza le informazioni minime
- Creare un nuovo utente
- Cancellare un utente
- Vedere le informazioni di un utente (Compresi relativi post e commenti)
- Cercare un utente
- Creare un post
- Cercare un post
- Creare un commento
- Vedere la lista di tutti i post e relativi commenti

[ATTENZIONE]
Gli utenti, i post e i commenti creati possono essere visualizzati solo dall'utente che li ha creati


Per provare l'applicazione installare i pacchetti npm e lanciare il server con ng serve
