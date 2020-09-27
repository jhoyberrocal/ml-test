import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import "./SearchBox.scss";

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    handleChange= e => {
        this.setState({
            value: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const { history } = this.props;
        const { value } = this.state;
        if (value.length > 3) {
            history.push(`/items?search=${value}`);
        }
    }

    render() {
        return(
            <header className="header">
                <div className="container">
                    <div className="col s12">
                        <div className="search-box">
                            <Link to="/">
                                <img src="/Logo_ML.png"
                                     srcSet="/Logo_ML.png 1x, /Logo_ML@2x.png 2x"
                                     alt="Mercado Libre"/>
                            </Link>
                             <form className="search-box-input" onSubmit={this.handleSubmit}>
                                 <input type="text"
                                        value={this.state.value}
                                        placeholder="Nunca dejes de buscar"
                                        className="search-box-input_box"
                                        onChange={this.handleChange}
                                 />
                                 <button
                                     type="submit"
                                     className="search-box-input_btn"
                                 >
                                     <img src="/images/ic_Search.png"
                                          srcSet="/images/ic_Search.png 1x, /images/ic_Search@2x.png 2x"
                                          alt="Buscar en Mercado Libre"/>
                                 </button>
                             </form>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default withRouter(SearchBox);