import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Product from './Product';
import {useSelector, useDispatch} from 'react-redux';
import {productData} from '../redux/productSlice';
import Logout from './Logout';
const Body = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productData());
  }, [dispatch]);
  const data = useSelector(state => state.products.products);
  const productList = data.products;
  const [filteredList, setFilteredList] = useState(productList);
  const [searchTerm, setSearchTerm] = useState('');
  const onHandleSearch = (text: any) => {
    setSearchTerm(text);
  };
  const filteredData = () => {
    let latestData = productList;
    latestData = latestData?.filter((list: any) =>
      list.title.toLowerCase().includes(searchTerm),
    );
    setFilteredList(latestData);
  };
  useEffect(() => {
    filteredData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, productList]);

  return (
    <SafeAreaView>
      <View style={styles.innerContainer}>
        <TextInput
          placeholder="Search Amazon.in"
          style={styles.searchBar}
          onChangeText={onHandleSearch}
        />
        <Logout />
      </View>
      <View>
        <FlatList
          data={filteredList}
          renderItem={itemData => <Product products={itemData.item} />}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
};

export default Body;

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginVertical: 15,
    marginHorizontal: 10,
    padding: 8,
    fontSize: 16,
    backgroundColor: 'white',
    width: 300,
  },
  innerContainer: {
    backgroundColor: '#00CED1',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  listContent: {
    paddingBottom: 200,
  },
});
