import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <a className="navbar-brand" href="/">Blog Post</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="btn btn-primary" to="/">
                    Back to Index
                  </Link>
                </li>
                <li className="nav-item ml-2">
                  <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}>
                    Delete Post
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="card mb-4">
          <h2 className="card-header">{post.title}</h2>
          <div className="card-body">
            <p className="card-text">{post.content}</p>
          </div>
          <div className="card-footer text-muted">
          Categories: &nbsp;
            <a href="/">{post.categories}</a>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect (mapStateToProps, { fetchPost, deletePost })(PostShow);
