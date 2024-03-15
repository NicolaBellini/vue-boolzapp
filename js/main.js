// import contacts from './contacts'

import contacts from './contacts.js';

const {createApp}=Vue

createApp({
  data() {
    return {
    contacts,
      counterContact:0,
      newMessageSent:'',
      botAnswers: [
        "Va bene, ci vediamo più tardi!",
        "Sì, capito, nessun problema!",
        "Non preoccuparti, lo farò sicuramente.",
        "Oh, interessante! Dimmi di più.",
        "Wow, davvero? Che notizia fantastica!",
        "Oh, mi dispiace sentirlo. Spero migliori presto.",
        "Hai ragione, dovremmo assolutamente farlo insieme.",
        "Capisco completamente, non ti preoccupare.",
        "Beh, dipende. Dobbiamo pensarci meglio.",
        "Ah, non lo sapevo! Grazie per l'informazione."
      ],
      counterBotAnswer:0,
      searchInput: '',
      isSearched:false,
      isChevronClicked:false,
      isDisplayedHiddenMenu:false,
      currentChevron: null,
      IsMouseEnterChevron:true


    
    }
  },

  methods: {
    getIdChat(index){
      this.counterContact = index
    },

    // funxione per sapere l' ora e la data dell' invio del newMessageObj
    setDateTime(){
      const newDate = new Date();
      
      const day = newDate.getDate();
      const month = newDate.getMonth() + 1;
       // I mesi in JavaScript vanno da 0 a 11, quindi aggiungiamo 1
      const year = newDate.getFullYear();
      
      const hour = newDate.getHours();
      const minutes = newDate.getMinutes();
      
      const fullDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

      const fulltime = `${hour < 10 ? '0' + hour : hour}:${minutes < 10 ? '0' + minutes : minutes}`;
      
      return `${fullDate} ${fulltime}`;
    },


    // creo il nuovo messaggio
    addNewMessage(){
      const newMessageObj = {
        date: this.setDateTime(),
        message: this.newMessageSent,
        status: 'sent'
      }
      this.contacts[this.counterContact].messages.push(newMessageObj);
      this.newMessageSent='';

       setTimeout(() => {
        const newMessageObjReceived = {
          date: this.setDateTime(),
          message: this.botAnswers[this.counterBotAnswer],
          status: 'received'
        }
        this.contacts[this.counterContact].messages.push(newMessageObjReceived);
        this.counterBotAnswer++

       
        
       }, 1000); 
    },

    deleteMessage(index){
        this.contacts[this.counterContact].messages.splice(index,1)
    },

    chevronIdGetter(index){
        return this.currentChevron= index
    },

    closeHiddenMenu(){
        if(this.IsMouseEnterChevron===true){
            this.isDisplayedHiddenMenu=false  
        }
    }
 

 

  },

  computed:{
    // messaggi inviati
    sentMessages(){
      return this.contacts[this.counterContact].messages.filter(message => message.status === 'sent');
    },
    // messaggi ricevuti
    receivedMessages(){
      return this.contacts[this.counterContact].messages.filter(message => message.status === 'received');
    },

    filteredContacts(){
        if(this.isSearched){
            return this.contacts.filter(contact => contact.name.toLowerCase().includes(this.searchInput.toLowerCase()))
        }
        return this.contacts
      }

  },

  mounted() {
    console.log(this.contacts,'ciao', this.setDateTime(), 'ciao', this.newMessageObj,this.receivedMessages);
  },
  
}).mount('#app')