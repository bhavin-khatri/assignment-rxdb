import React, { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ResponsivePixels from "../theme/responsive";
import { CustomButton } from "../components/CustomButton";
import { navigationConstants } from "../constants/navigationConstants";
import Colors from "../theme/colors";
import { commonStyles } from "../theme/common";
import { FontFamily } from "../theme/typography";
import { CustomImage } from "../components/CustomImage";
import Images from "../theme/images";
import CommonHeader from "../components/CommonHeader";

export default function BusinessList({ navigation, route }) {
  const { dbHelpers } = route.params; // passed via navigation
  const [businesses, setBusinesses] = useState([]);
  console.log("come here", dbHelpers);

  useFocusEffect(
    useCallback(() => {
      if (!dbHelpers) return;
      let isActive = true;
      const load = async () => {
        try {
          const list = await dbHelpers.listBusinesses();
          if (isActive) {
            setBusinesses(list.map((doc) => doc.toJSON()));
          }
        } catch (err) {
          console.error("❌ Error in load()", err);
        }
      };
      load();

      // subscribe reactively
      const sub = dbHelpers.db.businesses.find().$.subscribe(async () => {
        const list = await dbHelpers.listBusinesses();
        if (isActive) {
          setBusinesses(list.map((doc) => doc.toJSON()));
        }
      });

      return () => {
        isActive = false;
        sub.unsubscribe();
      };
    }, [dbHelpers])
  );

  const renderBusiness = ({ item }: { item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate(navigationConstants.ARTICLE_LIST, {
            business: item,
            dbHelpers,
          })
        }
      >
        <Text style={styles.name}>{item.name}</Text>
        <CustomImage
          style={styles.rightIcon}
          imageUrl={Images.ic_arrow_right}
        />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <CommonHeader screenName={"Business List"} />
      <View style={styles.container}>
        <FlatList
          data={businesses}
          keyExtractor={(item) => item.id}
          renderItem={renderBusiness}
        />
        <CustomButton
          buttonTitle="Add Business"
          onButtonClick={() =>
            navigation.navigate(navigationConstants.ADD_BUSINESS, { dbHelpers })
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: ResponsivePixels.size(16),
  },
  header: {
    ...commonStyles.title,
    fontSize: ResponsivePixels.fontSize(20),
    fontFamily: FontFamily.TEXT_BOLD,
  },
  item: {
    padding: ResponsivePixels.size(16),
    borderBottomWidth: ResponsivePixels.size(1),
    borderBottomColor: Colors.grey_shade_5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightIcon: {
    height: ResponsivePixels.size(20),
    width: ResponsivePixels.size(20),
  },
  name: { ...commonStyles.title, fontSize: ResponsivePixels.fontSize(18) },
});
