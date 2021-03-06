/** @jsx React.DOM */

var Article = React.createClass({displayName: 'Article',
  getInitialState: function() {
    return { date: timeSince(this.props.data.date) }
  },
  tick: function() {
    this.setState({ date: timeSince(this.props.data.date) });
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
    var test = this.props.data.title.replace("'", "").replace(/\s/g, "").replace(":", "").replace(" ", "").replace(",", "")
    console.log(test);
    var canvas = $('#' + test)[0];
    var context = canvas.getContext('2d');
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius = 70;
    var time = 100000 * (2 / (Math.floor(new Date().getTime() - new Date(this.props.data.date))));
    console.log(time, timeSince(new Date(time)));

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, time * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 50;
    context.strokeStyle = '#003300';
    context.stroke();
    window.c = context;
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    var articleStyle = {
      width: '100%',
      margin: '10px',
      height: '100%'
    }
    var imgStyle = {
      height: '200px',
      backgroundImage: 'url(' + this.state.img + ')',
      backgroundSize: 'cover'
    }
    return (
      React.DOM.div({className: "article"}, 
        React.DOM.div({className: "article-image", style: imgStyle }), 
        React.DOM.div({style: articleStyle }, 
          React.DOM.h1(null,  this.props.data.title.replace("'", "") ), 
          React.DOM.p(null,  this.props.data.author), 
          React.DOM.p(null, React.DOM.span(null, React.DOM.canvas({id:  this.props.data.title.replace("'", "").replace(/\s/g, "").replace(":", "").replace(" ", "").replace(",", "") }),  this.state.date, " ago")), 
          React.DOM.p(null,  this.props.data.description)
        )
      )
    );
  }
});
