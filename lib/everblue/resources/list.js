var Everblue = {};

Everblue.Test = function(element) {
  var self = this;
  this.element = $(element);
  this.runLink = this.element.find('.run');
  this.runLink.click(function() {
    self.run()
    return false;
  });
}

Everblue.Test.prototype.run = function() {
  var self = this
  this.iframe = $('<iframe></iframe>').attr('src', this.runLink.attr('href')).appendTo(this.element)
  this.iframe.css({ position: 'absolute', left: '-20000px' });
  this.runLink.addClass('running').text('Running…');
  $(this.iframe).load(function() {
    var context = self.iframe.get(0).contentWindow;
    var everblue = context.Everblue;
    if(everblue.done) {
      self.done(everblue.results);
    } else {
      everblue.onDone = function() {
        self.done(everblue.results);
      }
    }
  });
}

Everblue.Test.prototype.done = function(results) {
  var failed = []
  $.each(results, function() {
    if(!this.passed) { failed.push(this); }
  });

  this.runLink.removeClass('running');

  if(failed.length) {
    this.runLink.addClass('fail').removeClass('pass').text('Fail')
  } else {
    this.runLink.addClass('pass').removeClass('fail').text('Pass')
  }
  this.iframe.remove();
}

$(function() {
  $('#tests li, #all').each(function() {
    new Everblue.Test(this)
  });
});