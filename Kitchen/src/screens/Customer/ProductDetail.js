import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Picker,ImageBackground } from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("XS"); // Initial size selection
  const [isWishlist, setIsWishlist] = useState(false);
  const sizes = ["XS", "S", "M", "L", "XL"];

  const handleWishlist = async () => {
    try {
      // Send a request to your server to add/remove the product from the wishlist.
      const response = await axios.post(`http://localhost:5000/api/wishlist/${productId}`);
      if (response.status === 200) {
        setIsWishlist(!isWishlist); // Toggle the wishlist state
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  useEffect(() => {
    // Fetch product details using the productId
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: `http://localhost:5000/${product.image}` }} style={styles.productImage}>
        {/* Wishlist Icon */}
        <TouchableOpacity
          style={styles.wishlistIcon}
          onPress={handleWishlist}
        >
          <FontAwesome name={isWishlist ? "heart" : "heart-o"} size={24} color="red" />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.productInfoRow}>
        <Text style={styles.productName}>{product.title}</Text>
        <Text style={styles.productPrice}>Price: Rs.{product.price}</Text>
      </View>
      <View style={styles.sizeRow}>
  <Text>Select Size:</Text>
  <View style={styles.sizeButtons}>
    {sizes.map((size) => (
      <TouchableOpacity
        key={size}
        style={[
          styles.sizeButton,
          selectedSize === size ? styles.selectedSize : null
        ]}
        onPress={() => setSelectedSize(size)}
      >
        <Text style={styles.sizeButtonText}>{size}</Text>
      </TouchableOpacity>
    ))}
  </View>
</View>
      <Text style={styles.heading}>Description:</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => { /* Add to cart logic */ }}>
            <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
            
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  productImage: {
    width: "100%",
    height: 500, // Adjust the height to fit your design
    resizeMode: "cover",
    position: "relative", // Enable positioning
  },
  wishlistIcon: {
    position: "absolute",
    top: 16, 
    right: 16, 
    zIndex: 1, 
  },
  productInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 18,
  },
  sizeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  sizeButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  sizeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  selectedSize: {
    backgroundColor: "grey", // Highlighted color
    borderColor: "grey", // Highlighted border color
    color:"white"
  },
  sizeButtonText: {
    fontSize: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  productDescription: {
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "white", // White background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center", // Center button within its row
    borderRadius: "10px",
    backgroundColor: '#FFF',
    boxShadow: "0px 4px 4px 0px #BD8853",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductDetailScreen;