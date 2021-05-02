import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { COLORS, SIZES, FONTS } from "../constants";
import moment from "moment";

const Account = () => {
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
    console.log(markedDatesTemp);
    setMarkedDates(markedDatesTemp);
  }, [selectedDate]);
  return (
    <ScrollView
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View style={{ ...styles.shadow }}>
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
            backgroundColor: "salmon",
          }}
        >
          <View>
            <Text
              style={{ ...FONTS.h5, color: COLORS.grey, fontWeight: "600" }}
            >
              {moment().format("YYYY-MM-DD") === selectedDate
                ? "Today"
                : moment(selectedDate).format("YYYY MMM DD")}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
