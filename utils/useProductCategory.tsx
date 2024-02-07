import {useEffect, useState} from 'react';
import {CATEGORY_API} from '../constants/api';

const useProductList = () => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    fetchListOfCategories();
  }, []);

  const fetchListOfCategories = async () => {
    const res = await fetch(CATEGORY_API);
    const data = await res.json();

    setProductList(data);
  };
  return productList;
};

export default useProductList;
