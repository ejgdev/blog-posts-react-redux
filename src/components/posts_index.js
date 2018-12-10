import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

renderPosts() {
    return _.map(this.props.posts, (post) => {
      return (
        <li className="list-group-item" key={post.id}>
          <div className="card mb-4">
            <img className="card-img-top" src="https://alexzerbach.com/wp-content/uploads/2015/05/blue-grey-love-letter.png" alt={post.title} />
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p className="card-text">{post.content}</p>
              <Link className="btn btn-primary" to={`/posts/${post.id}`}>
                Read More &rarr;
              </Link>
            </div>
            <div className="card-footer text-muted">
              Posted in: &nbsp;
              <a href="/">{post.categories}</a>
            </div>
          </div>
        </li>
      );
    });
  }

  render() {
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
                  <Link className="btn btn-primary" to="/posts/new">
                    Add a Post
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
