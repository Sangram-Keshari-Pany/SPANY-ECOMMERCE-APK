import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { dynamicBorderRadius, dynamicFontSize, dynamicIconSize, dynamicPadding, dynamicWidth, Themes } from '../Themes/color';
import CustomIcons from '../Themes/CustomIcons';
import Toast from 'react-native-toast-message';
import { SavedCardApiFunction } from '../functionality/apifunctions';
import { useData } from '../functionality/APICall';
import CardBox from './CardBox';
import LinearGradient from 'react-native-linear-gradient';

const AddCardBox = ({ setSelectedCard, selectedcard, setOperation }: any) => {
    const { fetchdata } = useData();

    const [newcard, setNewCard] = useState({ card_holder_name: '', card_number: '', last_four_digits: '', expiration_date: '', cvv: '', token: '' });
    const [currentInputIndex, setCurrentInputIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const inputFields = [
        { key: 'card_number', label: 'Card Number', placeholder: 'Enter Your Card Number', value: newcard.card_number, maxLength: 16 },
        { key: 'expiration_date', label: 'Expiry Date', placeholder: 'MM/YY', value: newcard.expiration_date },
        { key: 'card_holder_name', label: 'Card Holder Name', placeholder: 'Enter Card Holder Name', value: newcard.card_holder_name },
        { key: 'cvv', label: 'CVV', placeholder: 'Enter Your CVV', value: newcard.cvv, maxLength: 3 },
    ];

    const handleChange = (key: string, value: string) => {
        setNewCard(prevState => ({ ...prevState, [key]: value }));
    };

    const validateInput = () => {
        const currentField = inputFields[currentInputIndex];
        if (!currentField.value.trim()) {
            Toast.show({ type: 'error', text1: `${currentField.label} is required`, position: 'bottom' });
            return false;
        }
        return true;
    };

    const handleNextInput = () => {
        if (!validateInput()) return;
        if (currentInputIndex === 2) setIsFlipped(true);
        else setIsFlipped(false);

        if (currentInputIndex < inputFields.length - 1) setCurrentInputIndex(currentInputIndex + 1);
    };

    const handlePreviousInput = () => {
        if (currentInputIndex === 2) setIsFlipped(true);
        else setIsFlipped(false);

        if (currentInputIndex > 0) setCurrentInputIndex(currentInputIndex - 1);
    };

    const handleSaveCard = async () => {
        if (validateInput()) {
            newcard.last_four_digits = newcard.card_number.slice(-4);
            await SavedCardApiFunction(newcard, fetchdata);
            setOperation(false);
        }
    };

    const renderInputField = () => (
        <View style={styles.validatebox}>
            <TouchableOpacity style={styles.nextButton} onPress={handlePreviousInput}>
                <CustomIcons name="doubleleft" color={Themes.color2} size={dynamicIconSize * 0.5} />
            </TouchableOpacity>
            <View style={styles.box}>
                <TextInput
                    maxLength={inputFields[currentInputIndex].maxLength}
                    placeholderTextColor={Themes.color7}
                    style={styles.inputText}
                    placeholder={inputFields[currentInputIndex].placeholder}
                    value={inputFields[currentInputIndex].value}
                    onChangeText={(text) => handleChange(inputFields[currentInputIndex].key, text.toUpperCase())}
                />
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={handleNextInput}>
                <CustomIcons name="doubleright" color={Themes.color2} size={dynamicIconSize * 0.5} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ alignItems: "center", width: dynamicWidth, justifyContent: "center" }}>
            <CardBox setSelectedCard={setSelectedCard} selectedcard={selectedcard} setOperation={setOperation} Data={newcard} flip={isFlipped} />
            <View style={styles.validatebox1}>
                <Text style={styles.label}>{inputFields[currentInputIndex].label}</Text>
            </View>
            {renderInputField()}
            {newcard.cvv.trim().length === 3 && (
                <LinearGradient colors={Themes.gradient1} style={styles.saveCardButton} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}  >
                    <TouchableOpacity style={styles.saveCardButton} onPress={handleSaveCard}>
                        <Text style={styles.saveCardText}>Save Card</Text>
                    </TouchableOpacity>
                </LinearGradient>
            )}
        </View>
    );
};

export default AddCardBox;

const styles = StyleSheet.create({
    box: { flex: 1 },
    inputText: {
        flex: 1,
        backgroundColor: Themes.color5,
        color: Themes.color9,
        borderRadius: dynamicBorderRadius,
        paddingHorizontal: dynamicPadding * 0.5,
    },
    label: {
        fontSize: dynamicFontSize,
        color: Themes.color9,
        fontWeight: 'bold',
    },
    nextButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    validatebox: {
        flexDirection: 'row',
        height: dynamicWidth * 0.1,
        width: dynamicWidth,
        gap: 5,
        alignItems: 'center',
    },
    validatebox1: {
        paddingHorizontal: dynamicPadding * 2.5,
    },
    saveCardButton: {
        width: dynamicWidth * 0.87,
        borderRadius: dynamicBorderRadius,
        height: dynamicFontSize * 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveCardText: {
        fontSize: dynamicFontSize,
        color: Themes.color6,
    },
});
