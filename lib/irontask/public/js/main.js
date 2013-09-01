refreshTasks = function() {
  var list = $('.tasks');
  list.empty();
  $.getJSON('/tasks', function(data, status, xhr) {
    var tasks = [];
    $.each(data, function(index, task){
      done_class = task.done ? 'done' : 'undone';
      t = '<div class="task ' + done_class + '">' + task.description + '</div>';
      tasks.push(t);
    });
    list.append(tasks);
    list.removeClass('loading');
  });
}

newTask = function(description){
  task = { 'description' : description }
  $.post('/task/new', { 'task': task }, function(data, status, xhr) {
    refreshTasks();
  });
}

deleteTask = function(id) {
  $.ajax('/task/' + id, {
    type: 'DELETE'
  }).done(function() {
    refreshTasks();
  });
}

$(function() {
  refreshTasks();

  $('#new-task').on('keydown', function(e) {
    var val = this.value;
    if(e.keyCode == 13) {
      newTask(val);
      this.value='';
    }
  });

});