import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import Breadcrumbs from "./../components/Breadcrumbs/Breadcrumbs";

function ProductDetails(props) {
    const {filters} = props;
    const {id} = useParams();

    const [article, setArticle] = useState({});
    const [description, setDescription] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const { REACT_APP_API_URL} = process.env;
            const url = `${REACT_APP_API_URL}/items/${id}`;

            try {
                const response = await fetch(url);
                const responseB = await fetch(`${url}/description`);
                const data = await response.json();
                const dataB = await responseB.json();

                setDescription(dataB);
                setArticle(data);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();
    }, [id]);

    return (
        <section className="row">
            <aside className={`col s12 ${filters.length ? '' : 'mt-2'}`}>
                {filters.length ? <Breadcrumbs filters={filters} /> : null}
            </aside>
            {isLoading ? 'Cargando información' : (
                <div className="col s12">
                    <div className="product-detail">
                        <img className="product-img"
                             src={article.pictures[0].url}
                             alt={article.title}
                        />
                        <div className="product-info">
                            <p className="product-info-label">
                                {article.condition === 'new' ? 'Nuevo' : 'Usado'} - {article.sold_quantity} vendidos
                            </p>
                            <h1 className="product-info-title">{article.title}</h1>
                            <p className="product-info-price">${article.price.toLocaleString('COP')}</p>
                            <button type="button" className="btn-buy">Comprar</button>
                        </div>
                        <div className="product-description">
                            <h3 className="product-description-title">Descripción del producto</h3>
                            <p className="product-description-description">{description.plain_text}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

const mapStateToProps = state => ({
    filters: state.filters
});

export default connect(mapStateToProps)(withRouter(ProductDetails));