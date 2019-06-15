var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
    MessagesView.$chats.on('click', '.username', MessagesView.handleClick);
  },

  render: function() {
    MessagesView.$chats.empty();
    // console.log(Messages.items());
    Messages
      .items()
      .filter(message => Rooms.isSelected(message.roomname))
      .each((message) => MessagesView.renderMessage(message));
  },

  renderMessage: function(message) {
    let $message = MessageView.render(message);
    MessagesView.$chats.prepend($message);
  },

  handleClick: function(event) {
    let username = $(event.target).data('username');
    if (username === undefined) { return; }
    console.log('clicked on: ', username);
    Friends.toggleStatus(username, MessagesView.render);
  }

};