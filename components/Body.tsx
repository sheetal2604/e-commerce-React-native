import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import useProductCategory from '../utils/useProductCategory';
import Product from './Product';
const Body = () => {
  const json = useProductCategory();
  const productList = json.products;
  const [filteredList, setFilteredList] = useState(productList);
  const [searchTerm, setSearchTerm] = useState('');
  const onHandleSearch = (text: any) => {
    setSearchTerm(text);
  };
  const filteredData = () => {
    let latestData = productList;
    latestData = latestData?.filter(list =>
      list.title.toLowerCase().includes(searchTerm),
    );
    setFilteredList(latestData);
  };
  useEffect(() => {
    filteredData();
  }, [searchTerm, productList]);

  return (
    <SafeAreaView>
      <View style={styles.innerContainer}>
        <TextInput
          placeholder="Search Amazon.in"
          style={styles.searchBar}
          onChangeText={onHandleSearch}
        />
      </View>

      <View>
        {!productList && (
          <ActivityIndicator
            size="large"
            animating={productList ? false : true}
          />
        )}
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
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  innerContainer: {
    backgroundColor: '#00CED1',
  },
  listContent: {
    paddingBottom: 200,
  },
});
