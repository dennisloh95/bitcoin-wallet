import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  Pressable,
  Linking,
} from "react-native";
import { useQuery } from "react-query";
import { LinearGradient } from "expo-linear-gradient";
import { SIZES, FONTS, COLORS, dummyData, lineChart } from "../constants";
import { Zocial } from "@expo/vector-icons";
import Chart from "../chart/react-native-f2chart";
import moment from "moment";
import { useSelector } from "react-redux";

const getCurrentPrice = async () => {
  return await (await fetch(dummyData.api.currentPrice)).json();
};

const getClosePrice = async () => {
  return await (await fetch(dummyData.api.closePrice)).json();
};

const Home = () => {
  const wallet = useSelector((state) => state.wallet.wallet);

  const currentPrice = useQuery("currentPrice", getCurrentPrice, {
    refetchInterval: 60000,
  });
  const closePrice = useQuery("closePrice", getClosePrice, {
    refetchInterval: 60000,
  });

  if (currentPrice.isLoading || closePrice.isLoading)
    return (
      <View style={styles.container}>
        <Text>loading...</Text>
      </View>
    );
  if (currentPrice.error || closePrice.error)
    return (
      <View style={styles.container}>
        <Text>Something went wrong.</Text>
      </View>
    );

  useEffect(() => {
    let t = wallet.filter((item) => item.sell === false);
    console.log(t);
  }, []);

  const renderHeader = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 290,
          ...styles.shadow,
        }}
      >
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          locations={[0.3, 0.5]}
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 80,
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
              Account Balance
            </Text>
            <Text
              style={{
                marginTop: SIZES.base,
                marginBottom: SIZES.base / 2,
                color: COLORS.white,
                ...FONTS.h1,
              }}
            >
              ${currentPrice.data.bpi.USD.rate}
            </Text>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.body5,
              }}
            >
              {moment
                .utc(currentPrice.data.time.updated)
                .local()
                .format("LLLL")}
            </Text>
          </View>
        </LinearGradient>
        <View
          style={{
            position: "absolute",
            bottom: "-20%",
            flex: 1,
            width: "100%",
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
              marginBottom: SIZES.base,
            }}
          >
            Current Price
          </Text>
          <View
            style={{
              width: "100%",
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.padding,
              borderRadius: 10,
              backgroundColor: COLORS.white,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View>
                <Zocial name="bitcoin" size={40} color="#f2a900" />
              </View>
              <View style={{ marginLeft: SIZES.radius }}>
                <Text style={{ ...FONTS.h2 }}>
                  {currentPrice.data.chartName}
                </Text>
                <Text style={{ ...FONTS.body3, color: COLORS.grey }}>
                  ${currentPrice.data.bpi.USD.rate}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  let lineChartData = Object.entries(closePrice.data.bpi).map((data) => {
    return {
      date: data[0],
      value: data[1],
    };
  });

  let candleChartData = Object.entries(closePrice.data.bpi).map((data) => {
    const randomPrice =
      data[1] * parseFloat((Math.random() * (1.2 - 0.8) + 0.8).toFixed(2));
    const randomVolumn = Math.random() * (1000000000 - 100000000) + 100000000;

    return {
      date: data[0],
      value: data[1],
      reportDate: data[0],
      start: randomPrice,
      end: data[1],
      high: randomPrice,
      low: randomPrice,
      volumn: randomVolumn,
      MA5: randomPrice,
      MA10: randomPrice,
      MA20: randomPrice,
      MA30: randomPrice,
    };
  });

  const renderChart = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 2.5,
          height: "100%",
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          borderRadius: 10,
          backgroundColor: COLORS.white,
          marginHorizontal: SIZES.padding,
          ...styles.shadow,
        }}
      >
        <Chart initScript={lineChart(lineChartData)} />
        <View style={{ alignItems: "flex-end", marginTop: SIZES.base }}>
          <Pressable
            onPress={() =>
              Linking.openURL("https://www.coindesk.com/price/bitcoin")
            }
          >
            <Text style={{ ...FONTS.body5, color: COLORS.grey }}>
              Power by CoinDesk
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, paddingBottom: 130 }}>
        {renderHeader()}
        {renderChart()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
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

export default Home;
