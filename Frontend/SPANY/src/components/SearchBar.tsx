import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import CustomIcons from '../Themes/CustomIcons';
import { Themes } from '../Themes/color';
import { dynamicFontSize } from '../Themes/color';
import { dynamicPadding } from '../Themes/color';
import { dynamicBorderRadius } from '../Themes/color';

interface SearchBarProps { title: string; navigation: any; searchedValue?: string; }

const SearchBar: React.FC<SearchBarProps> = ({ title, navigation, searchedValue = "" }) => {
  const [searchValue, setSearchValue] = useState<string>(searchedValue);

  const handleTextChange = (text: string) => {
    setSearchValue(text);
  };

  const handleSubmitEditing = () => {
    if (searchValue.trim()) {
      navigation.navigate("Home", { screen: "SearchScreen", params: { searchValue } });
    } else {
      console.error("Search value cannot be empty.");
    }
  };

  return (
    <View style={styles.searchBar}>
      {title.length > 1 && (
        <Text style={styles.heading}>Shop</Text>
      )}
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor={Themes.color7}
          multiline={false}
          scrollEnabled={true}
          allowFontScaling={false}
          value={searchValue}
          onChangeText={handleTextChange}
          onSubmitEditing={handleSubmitEditing}
        />
        <View style={styles.camera}>
          <CustomIcons name="camera" size={dynamicFontSize * 2} color={Themes.color2} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    color: Themes.color9,
    fontSize: dynamicFontSize * 3
  },
  searchBox: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    height: dynamicFontSize * 2.8,
    backgroundColor: Themes.color5,
    borderRadius: dynamicBorderRadius * 0.5,
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: dynamicPadding
  },
  input: {
    flex: 1,
    height: "100%",
    color: Themes.color9,
    fontFamily: 'Raleway',
    fontSize: dynamicFontSize,
    paddingLeft: dynamicPadding,
    borderRadius: dynamicBorderRadius * 0.5,
  },
  camera: {
    right: 5,
  },
});

export default SearchBar;
