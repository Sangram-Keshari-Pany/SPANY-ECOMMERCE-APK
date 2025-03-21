import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { dynamicBorderRadius, dynamicFontSize, dynamicMargin, dynamicPadding, dynamicWidth, Themes } from '../Themes/color'

const CategoryItemComponent = ({navigation, category, subcategories, expanded, onPress }: any) => {
    return (
        <View style={styles.maincontainer}>
            <TouchableOpacity style={styles.categoryItem} onPress={onPress}>
                <Text style={styles.categoryname}>{category.category_name}</Text>
            </TouchableOpacity>

            {expanded && subcategories.length > 0 && (
                <View style={styles.subcategoryContainer}>
                    {subcategories.map((sub: any, index: any) => (
                        <TouchableOpacity key={index} style={styles.subcategoryItem} onPress={()=>{navigation.navigate("Home", { screen: "SearchScreen",params: { subcategoryid: sub.id }})}}>
                            <Image source={{uri:sub.sub_category_image}} style={styles.imagebox}/>
                            <Text style={styles.categoryText}>{sub.sub_category_name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    )
}

export default CategoryItemComponent

const styles = StyleSheet.create({
    maincontainer:{
        marginHorizontal:dynamicMargin,
        marginVertical:dynamicMargin*0.25,
    },
    categoryItem: { 
        flexDirection:'row',
        alignItems:'center',
        width:dynamicWidth,
        backgroundColor:Themes.color1,
    },
    icon: { 
        width:"20%",
        height:"100%",
        borderWidth:5,
        marginRight:dynamicMargin,
        borderColor:Themes.color10,
        backgroundColor:Themes.color1,
        borderRadius:dynamicBorderRadius*0.5,
    },
    categoryname:{
        fontSize:dynamicFontSize*1.5,
        fontWeight:"bold" ,
        color:Themes.color9,
    },
    categoryText: { 
        fontSize:dynamicFontSize,
        fontWeight:"bold" ,
        color:Themes.color9,
    },
    subcategoryContainer: { 
        display:"flex",
        flexWrap:"wrap",
        gap:dynamicMargin*0.5,
        flexDirection:"row",
        width:dynamicWidth,
        marginVertical:dynamicMargin*0.25,
    },
    imagebox:{
        flex:1,
        aspectRatio:1,
        borderRadius:50,
        borderWidth:1,
        borderColor:Themes.color10,
        shadowColor: Themes.color4,
        shadowOffset: { width: -1, height: -1 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 15,
        alignItems:"center",
        justifyContent:"center",
        resizeMode:"contain",
        backgroundColor:Themes.color1

    },
    subcategoryItem: { 
        height:dynamicWidth*0.20,
        alignItems:"center",
    },
})