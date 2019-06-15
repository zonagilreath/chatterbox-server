var FormView = {

  $form: $('form'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();

    let message = {
      roomname: Rooms.selected || lobby,
      text: FormView.$form.find('#message').val(),
      username: App.username
    };

    Parse.create(message, (data) => {
      // Messages = [message, ...Messages];
      // _.extend(message, data);
      // console.log(data);
      // Messages.add(message, MessagesView.render);      
    });
    
    console.log('Message sent to Parse Server');
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};