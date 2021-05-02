import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { COLORS, SIZES, FONTS } from "../constants";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { updateAmount } from "../redux/wallet/wallet.action";
import { AntDesign } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import { color } from "react-native-reanimated";

const Account = ({ navigation }) => {
  const wallet = useSelector((state) => state.wallet.wallet);
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(
    moment(selectedDate).format("YYYY-MM-DD")
  );
  const [markedDates, setMarkedDates] = useState();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    let markedDatesTemp = {};
    markedDatesTemp[moment(selectedDate).format("YYYY-MM-DD")] = {
      selected: true,
    };
    setMarkedDates(markedDatesTemp);
  }, [selectedDate]);

  const deleteTransactionHandler = (id) => {
    let tempWallet = wallet.filter((item) => item.id !== id);
    dispatch(updateAmount(tempWallet));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <View style={{ ...styles.shadow, paddingTop: insets.top }}>
        <Calendar
          theme={{
            backgroundColor: COLORS.white,
            calendarBackground: COLORS.white,
            textSectionTitleColor: COLORS.black,
            textSectionTitleDisabledColor: COLORS.lightGrey,
            selectedDayBackgroundColor: COLORS.primary,
            selectedDayTextColor: COLORS.white,
            todayTextColor: COLORS.primary,
            dayTextColor: COLORS.black,
            textDisabledColor: COLORS.lightGrey,
            dotColor: COLORS.secondary,
            selectedDotColor: COLORS.white,
            arrowColor: COLORS.primary,
            disabledArrowColor: COLORS.lightGrey,
            monthTextColor: COLORS.primary,
            indicatorColor: COLORS.primary,
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "300",
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
          style={{ paddingBottom: SIZES.padding }}
          current={new Date()}
          minDate={"2010-01-01"}
          maxDate={"2030-01-01"}
          onDayPress={(day) => {
            console.log("selected day", day);
            setSelectedDate(moment(day.dateString).format("YYYY-MM-DD"));
          }}
          onDayLongPress={(day) => {
            console.log("selected day", day);
          }}
          onMonthChange={(month) => {
            console.log("month changed", month);
          }}
          markedDates={markedDates}
        />
      </View>

      <View
        style={{
          flex: 1,
          padding: SIZES.padding,
          marginTop: SIZES.base,
        }}
      >
        <View style={{ paddingBottom: 100 }}>
          <Text
            style={{ ...FONTS.h4, color: COLORS.primary, fontWeight: "600" }}
          >
            {moment().format("YYYY-MM-DD") === selectedDate
              ? "Today"
              : moment(selectedDate).format("YYYY MMM DD")}
          </Text>
          {wallet.filter(
            (item) =>
              moment(item.date).format("YYYY MMM DD") ===
              moment(selectedDate).format("YYYY MMM DD")
          ).length ? (
            <SwipeListView
              showsVerticalScrollIndicator={false}
              data={wallet.filter(
                (item) =>
                  moment(item.date).format("YYYY MMM DD") ===
                  moment(selectedDate).format("YYYY MMM DD")
              )}
              keyExtractor={(item) => {
                return item.id.toString();
              }}
              renderItem={({ item }) => (
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    borderColor: COLORS.lightGrey,
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: SIZES.radius,
                    marginBottom: SIZES.base,
                    alignItems: "center",
                    height: 80,
                    color: COLORS.white,
                    flexDirection: "row",
                    ...styles.shadow,
                  }}
                >
                  <AntDesign
                    name={item.sell ? "minus" : "plus"}
                    size={20}
                    color={item.sell ? COLORS.red : COLORS.green}
                    style={{ padding: SIZES.radius }}
                  />
                  <Text
                    style={{
                      color: item.sell ? COLORS.red : COLORS.green,
                      ...FONTS.h3,
                    }}
                  >
                    {item.amount} btc
                  </Text>
                </View>
              )}
              renderHiddenItem={({ item }, rowMap) => (
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: SIZES.base,
                    height: 80,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("TransactionBottomSheet", {
                        id: item.id,
                      });
                      rowMap[item.id].closeRow();
                    }}
                  >
                    <AntDesign
                      name="edit"
                      size={25}
                      color="black"
                      style={{ padding: SIZES.radius }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleteTransactionHandler(item.id)}
                  >
                    <AntDesign
                      name="delete"
                      size={25}
                      color="black"
                      style={{ padding: SIZES.radius }}
                    />
                  </TouchableOpacity>
                </View>
              )}
              leftOpenValue={75}
              rightOpenValue={-75}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.lightGrey,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7,

    elevation: 5,
  },
});

export default Account;
