var Task = function(id, description, done) {
  this.id = id;
  this.description = description;
  this.done = done;

  this.save = function(callback) {
    $('/task/new', { 'task': this }, function(data, status, xhr){
      callback(data);
    });
  }

  this.delete = function(callback) {
    $.ajax('/task/' + this.id, { type: 'DELETE' }).done(callback);
  }

  this.update = function(callback) {
    $.post('/task/' + this.id, { 'task': this }, function(data, status, xhr) {
      callback(data);
    }); 
  }

};

Task.prototype.fetchAll = function(callback) {
  $.getJSON('/tasks', function(data, status, xhr) {
    var tasks = [];
    $.each(data, function (index, task) {
      taskObj = new Task(task._id, task.description, task.done);
      tasks.push(taskObj);
    });
    callback(tasks);
  });
};

$(function() {

  var list = $('.tasks');
  Task.prototype.fetchAll(function(tasks) {
    $.each(tasks, function(index, task) {
      css_class = task.done ? 'done' : 'undone';
      list.append('<div id="' + task.id + '" class="task ' + css_class + '">' + task.description + '</div>');
    });
    list.removeClass('loading');
  });

  $('#new-task').on('keydown', function(e) {
    if(e.keyCode == 13) {
      task = new Task(null, this.value, false);
      task.save(function(data){
        console.log(data);
      });
      this.value = '';
    }
  });

});