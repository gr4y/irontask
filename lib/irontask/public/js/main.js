function refresh() {
  var list = $('.tasks'); 
  var template = $('#task-tpl').html();
  $.getJSON('/tasks', function(tasks, status, xhr) {
    
    if(status = 'success') {
      list.empty();
    }
    
    $.each(tasks, function(index, task) {
      output = Mustache.render(template, { 
        task: {
          id: task._id,
          description: task.description,
          done: task.done,
          class: task.done ? 'done' : 'undone',
          checkbox_attributes: task.done ? 'checked' : ''
        }
      });
      list.append(output);
    });
    list.removeClass('loading');
  });
}

$(function() {

  var errorCallback = function() {
    alert('Something went wrong!');
  }

  refresh();

  $('.list').on('change', '.task .checkbox', function() {
    var id = $(this).parent().data('id');
    $.ajax('/task/update', { 
      type: 'POST',
      data: {
        id: id,
        task: {
          done: this.checked
        }
      }
    }).fail(errorCallback).always(refresh);
  });

  $('.list').on('click', '.task .delete', function() {
    var id = $(this).parent().data('id');
    $.ajax('/task/'+ id, { 
      type: 'DELETE'
    }).fail(errorCallback).always(refresh);
  });

  $('#new-task').on('keydown', function(e) {
    if(e.keyCode == 13) {
      $.post('/task/new', {
        task: {
          description: this.value,
          done: false
        }
      }).fail(errorCallback).always(refresh);
      this.value = '';
    }
  });

});