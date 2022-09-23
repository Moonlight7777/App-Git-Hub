import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from './apiGithub';
import styles from './Styles/Style';


export default function App() {
const [repositores, setrepositores] = useState([])

const _loadingRepositores = async() =>{
  try {
    const response = await api.get("/users");
    setrepositores(response.data)
  } catch (error) {
    console.log(error)
  }
}

const _viewDetails = async(userLogin) =>{
  try {
    const response = await api.get(`/users/${userLogin}/repos`);
    const reposNumber = response.data.lenght;
    console.log(response.data);
    Alert.alert(userLogin, `Repositórios: ${reposNumber}`);
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
  _loadingRepositores()
},[])

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style ={styles.title}>Repositório do GitHub</Text>
      {repositores.map((item)=>{
        return <TouchableOpacity key={item.id} onPress={()=>_viewDetails(item.login)} style={styles.line}>
        <View style ={styles.pai}>
          <Image source={{uri: item.avatar_url}} style={styles.image}/>
          <Text style={styles.lineText}>{item.login}</Text>
        </View>
        </TouchableOpacity>
})}
      <StatusBar style="auto" />
    </View>
    </ScrollView>
  );
}
