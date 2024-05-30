import { useAppSelector } from "@/hook";
import { CartItem, ICustomer } from "@/types";
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import React from "react";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  image: {},
  text: {},
});

const PdfFile = ({
  cart,
  customer,
}: {
  cart: CartItem[];
  customer: ICustomer;
}) => {
  // const { customer } = useAppSelector((store) => store.cart);
  return (
    <Document>
      <Page size={"A4"}>
        <View style={styles.container}>
          <View style={styles.section}>
            {Object.keys(customer).map((item) => (
              <Text key={item}>{item}</Text>
            ))}
          </View>
          <View style={styles.section}>
            <Text>{customer.fullName}</Text>
            <Text>{customer.mobile}</Text>
            <Text>{customer.notes}</Text>
            <Text>{new Date(customer.date).toDateString()}</Text>
            <Text>{customer.time}</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10,
            border: "1px solid black",
          }}
        >
          <Text style={{ width: "25%", fontSize: 18, fontWeight: "bold" }}>
            Name
          </Text>
          <Text style={{ width: "25%", fontSize: 18, fontWeight: "bold" }}>
            Quantity
          </Text>
          <Text style={{ width: "25%", fontSize: 18, fontWeight: "bold" }}>
            Size
          </Text>
          <Text style={{ width: "25%", fontSize: 18, fontWeight: "bold" }}>
            Instructions
          </Text>
        </View>
        {cart.map((item) => (
          <View
            key={item.id}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <Text style={{ width: "25%", fontSize: 15 }}>{item.name}</Text>
            <Text style={{ width: "25%", fontSize: 15 }}>{item.quantity}</Text>
            <Text style={{ width: "25%", fontSize: 15 }}>{item.size}</Text>
            <Text style={{ width: "25%", fontSize: 15 }}>
              {item.instructions ? item.instructions : "none"}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default PdfFile;
