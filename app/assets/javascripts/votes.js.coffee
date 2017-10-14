$ ->
  $('.vote-container').on 'ajax:success', 'form.vote-form', (event, data) ->
    form = event.target
    container = form.closest('.vote-container')
    container.innerHTML = data
