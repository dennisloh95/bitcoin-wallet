import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { AntDesign, Zocial } from "@expo/vector-icons";
import { COLORS, SIZES, FONTS } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { addAmount } from "../redux/wallet/wallet.action";

function Amount(date, amount, sell = false) {
  (this.date = date), (this.amount = amount), (this.sell = sell);
}

const Transaction = ({ navigation }) => {
  const [selectedSegment, setSelectedSegment] = useState(0);
  const wallet = useSelector((state) => state.wallet.wallet);
  const [value, setValue] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleUpdateValue = (val) => {
    let index = val.indexOf(".");

    if (index > -1) {
      val = val.substr(0, index + 1) + val.slice(index).replace(/\./g, "");
    }
    setValue(val);
  };

  const handleAddAmount = () => {
    Alert.alert(
      "Transaction",
      value ? "Transaction Added" : "Please insert value.",
      [
        {
          text: "OK",
          onPress: () => {
            if (value) {
              let amount = new Amount(
                moment(date).valueOf(),
                value,
                selectedSegment === 0 ? false : true
              );
              let tempWallet = [...wallet, amount];
              dispatch(addAmount(tempWallet));
              navigation.goBack();
            }
          },
        },
      ]
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          paddingHorizontal: SIZES.padding / 2,
          paddingVertical: SIZES.padding,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{ padding: SIZES.base }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="close" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: SIZES.base }}
          onPress={() => handleAddAmount()}
        >
          <AntDesign name="check" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: SIZES.padding }}>
        <Text
          style={{
            ...FONTS.h1,
            marginBottom: SIZES.padding,
            color: COLORS.primary,
          }}
        >
          Add Transaction
        </Text>
        <SegmentedControl
          values={["Buy", "Sell"]}
          selectedIndex={0}
          onChange={(event) => {
            setSelectedSegment(event.nativeEvent.selectedSegmentIndex);
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomColor: COLORS.lightGrey,
            borderBottomWidth: 1,
          }}
        >
          <Zocial name="bitcoin" size={35} color="#f2a900" />
          <View style={{ flex: 1 }}>
            <TextInput
              returnKeyType="done"
              clearButtonMode="while-editing"
              autoFocus
              style={{
                ...FONTS.h1,
                marginTop: SIZES.radius,
                padding: SIZES.base,
                textAlign: "right",
                color: selectedSegment === 0 ? COLORS.green : COLORS.red,
              }}
              onChangeText={handleUpdateValue}
              value={value}
              placeholder="0"
              keyboardType="decimal-pad"
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            backgroundColor: COLORS.secondary,
            borderRadius: 10,
            marginTop: SIZES.padding,
            flexDirection: "row",
            alignItems: "center",
            ...styles.shadow,
          }}
          onPress={() => setShow(true)}
        >
          <AntDesign name="calendar" size={24} color={COLORS.white} />
          <Text
            style={{
              ...FONTS.h3,
              marginLeft: SIZES.base,
              color: COLORS.white,
            }}
          >
            {moment().format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD")
              ? "Today"
              : moment(date).format("YYYY-MM-DD")}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={show}
          mode="date"
          onConfirm={(date) => {
            setDate(date);
            setShow(false);
          }}
          maximumDate={new Date()}
          onCancel={() => setShow(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7,

    elevation: 5,
  },
});

export default Transaction;
