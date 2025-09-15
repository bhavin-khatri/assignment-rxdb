import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import ResponsivePixels from "../theme/responsive";
import { CustomButton } from "../components/CustomButton";
import CommonHeader from "../components/CommonHeader";
import CustomModal from "../components/CustomModal";
import Colors from "../theme/colors";
import { commonStyles } from "../theme/common";

export default function ArticleList({ navigation, route }) {
  const { business, dbHelpers } = route.params;
  const [articles, setArticles] = useState([]);
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [showModal, setShowModal] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      const list = await dbHelpers.listArticlesForBusiness(business.id);
      setArticles(list.map((doc) => doc.toJSON()));
    };
    load();

    const sub = dbHelpers.db.articles.find().$.subscribe(async () => {
      const list = await dbHelpers.listArticlesForBusiness(business.id);
      setArticles(list.map((doc) => doc.toJSON()));
    });
    return () => sub.unsubscribe();
  }, [business.id, dbHelpers]);

  const handleAddArticle = async () => {
    if (!name.trim() || !qty || !price) {
      Alert.alert("Validation", "Please fill all fields");
      return;
    }
    await dbHelpers.createArticle({
      name,
      qty: Number(qty),
      selling_price: Number(price),
      business_id: business.id,
    });
    toggleModal();
    setName("");
    setQty("");
    setPrice("");
  };

  const renderArticle = ({ item }: { item: any }) => {
    return (
      <View style={styles.item}>
        <View style={styles.columnView}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>₹{item.selling_price}</Text>
        </View>

        <Text style={styles.qty}>Qty: {item.qty}</Text>
      </View>
    );
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <CommonHeader screenName={`Articles for ${business.name}`} />
      <CustomModal
        name={name}
        setName={setName}
        quantity={qty}
        setQuantity={setQty}
        price={price}
        setPrice={setPrice}
        isModalVisible={showModal}
        onRequestClose={toggleModal}
        onRequestSuccess={async () => {
          await handleAddArticle();
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id}
          renderItem={renderArticle}
        />

        <CustomButton
          buttonTitle="Add Article"
          onButtonClick={toggleModal}
          mainButtonStyles={styles.button}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: ResponsivePixels.size(16),
    justifyContent: "flex-end",
  },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  item: {
    padding: ResponsivePixels.size(16),
    borderBottomWidth: ResponsivePixels.size(1),
    borderBottomColor: Colors.grey_shade_5,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  columnView: {},
  name: { ...commonStyles.title, fontSize: ResponsivePixels.fontSize(18) },
  price: { ...commonStyles.subtitle, color: Colors.success },
  qty: { ...commonStyles.subtitle, color: Colors.grey_shade_5 },
  form: { marginTop: 16 },
  input: {
    marginTop: ResponsivePixels.size(16),
  },
  button: {
    marginTop: ResponsivePixels.size(24),
  },
});
