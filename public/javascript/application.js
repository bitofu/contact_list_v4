$(function() {

  var contactList = $('#contact-list')
  var contactListItem = Handlebars.compile($('#contact-item-template').html());

  $.ajax({
    url: '/contacts',
    method: 'get',
    dataType: 'json'
  }).done(populateContactList)
    .done(slideContacts);

  function slideContacts(){
    $('.contact-name').fadeIn();
  }

  function slideDownNewContact(){
    contactList.children().first().slideDown();
  }

  function populateContactList(contacts) {
    // console.log(contacts);
    contacts.forEach(appendContact);
  }

  function appendContact(contact){
    contactList.append(contactListItem(contact));
    // var contactName = $("<li>").text(contact.first_name + ' ' + contact.last_name)
    // contactName.appendTo(contactList);
    // $("<ul class='contact-info'>").text(contact.email).appendTo(contactName);
    // $("<ul class='contact-info'>").text(contact.phone_number).appendTo(contactName)
  }

  var newContactForm = $('#new-contact-form');

  newContactForm.on('submit', function (){
    $.ajax({
      url: newContactForm.attr('action'),
      method: newContactForm.attr('method'),
      data: newContactForm.serialize()
    }).done(prependContact)
      .done(slideDownNewContact)
      .done(function() {
        newContactForm[0].reset();
      });
    return false;
  });


  contactList.on('click', '.contact-name', function(){
    // console.log('working');
    $(this).children('.contact-info').slideToggle();
    return false;
  });

  function prependContact(contact){
    contactList.prepend(contactListItem(contact));
    // var contactName = $("<li class='new-contact-name'>").text(contact.first_name + ' ' + contact.last_name)
    // contactName.prependTo(contactList);
    // $("<ul class='contact-info'>").text(contact.email).appendTo(contactName);
    // $("<ul class='contact-info'>").text(contact.phone_number).appendTo(contactName)
  }

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
