import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../store/actions';
import { withRouter, Link } from 'react-router-dom';
import ListItem from "./../components/ListItem/ListItem";
import Breadcrumbs from "./../components/Breadcrumbs/Breadcrumbs";

function Results(props) {
    const params = new URLSearchParams(props.location.search);
    const search = params.get('search');

    const [articles, setArticles] = useState([]);
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const { REACT_APP_API_URL, REACT_APP_SEARCH_API} = process.env;
            const url = `${REACT_APP_API_URL}${REACT_APP_SEARCH_API}?q=${search}`;

            try {
                const { dispatch } = props;
                const response = await fetch(url);
                const data = await response.json();
                const results = data.results.slice(0, 4);

                if (data.filters.length) {
                    const filtersData = data.filters[0].values[0].path_from_root;

                    dispatch(setFilter(filtersData));

                    setFilters(filtersData);
                } else {
                    dispatch(setFilter([]));

                    setFilters([]);
                }

                setArticles(results);
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();
    }, [search]);

    const listArticles = items => items.map((item, idx) => (
        <article
            key={item.id}
            className={`col s12 ${idx === 0 ? 'first-round': ''} ${idx === items.length - 1 ? 'last-round': ''}`}
        >
            <Link className="item-link" to={`/items/${item.id}`}>
                <ListItem item={item} />
            </Link>
        </article>
    ));

    return (
        <section className="row">
            <aside className={`col s12 ${filters.length ? '' : 'mt-2'}`}>
                {filters.length ? <Breadcrumbs filters={filters} /> : null}
            </aside>
            { articles.length ? listArticles(articles) : null }
        </section>
    );
}

export default connect()(withRouter(Results));