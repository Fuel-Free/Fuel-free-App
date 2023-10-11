import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const brands = [
    { id: 1, logo: require('../../../assets/brandtata.png'), brand: "tata" },
    { id: 2, logo: require('../../../assets/brandMB.png'), brand: "Mercedes" },
    { id: 3, logo: require('../../../assets/brandTVS.png'), brand: "tvs" },
    { id: 4, logo: require('../../../assets/brandvolvo.png'), brand: "volvo" },
    { id: 5, logo: require('../../../assets/brandspeego.png'), brand: "speego" },
    { id: 6, logo: require('../../../assets/komaki.png'), brand: "komaki" },
    { id: 7, logo: require('../../../assets/kinatic.png'), brand: "kinetic" },
    { id: 8, logo: require('../../../assets/brandkia.png'), brand: "kia" },
    { id: 9, logo: require('../../../assets/brandhyndai.png'), brand: "hundai" },
    { id: 10, logo: require('../../../assets/brandhero.png'), brand: "hero" },
    { id: 11, logo: require('../../../assets/brandeicher.png'), brand: "eicher" },
    { id: 12, logo: require('../../../assets/brandaudi.png'), brand: "audi" },
    { id: 13, logo: require('../../../assets/brandmahindra.png'), brand: "mahindra" },
    { id: 14, logo: require('../../../assets/ola.png'), brand: "ola" },
    { id: 15, logo: require('../../../assets/brandpureev.png'), brand: "PURE EV" },
    { id: 16, logo: require('../../../assets/brandmg.png'), brand: "MG-ZS" },
];

const Populerbrands = () => {
    const navigation = useNavigation();

    const gotoBrand = (brand) => {
        navigation.navigate("BrandProduct", { Brand: brand });
    };

    const renderBrandItems = () => {
        const items = [];
        const rows = Math.ceil(brands.length / 4);
         
        for (let i = 0; i < rows; i++) {
            const rowItems = brands.slice(i * 4, (i + 1) * 4);
            items.push(
                <View key={i} style={styles.brandRow}>
                    {rowItems.map((brand) => (
                        <TouchableOpacity
                            key={brand.id}
                            style={styles.brandItem}
                            onPress={() => gotoBrand(brand.brand)}
                        >
                            <View style={styles.brandImageContainer}>
                                <Image
                                    source={brand.logo}
                                    style={styles.brandLogo}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            );
        }
        return items;
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Popular Brands:</Text>
                <View style={styles.brandContainer}>
                    {renderBrandItems()}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 40,
        top: 10,

    },
    brandContainer: {
        justifyContent: 'center',
    },
    brandRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    brandItem: {
        flex: 1,
        padding: 5,
    },
    brandImageContainer: {
        backgroundColor: 'rgba(173, 216, 230, 0.3)',
        padding: 5,
        borderRadius: 8,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    brandLogo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default Populerbrands;