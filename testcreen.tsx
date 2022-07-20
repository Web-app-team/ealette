<View style={styles.text}>
  {/* <Text style={styles.paragraph}>{latitude}</Text>
<Text style={styles.paragraph}>{longitude}</Text> */}
  <Text>登録ありがとうございます！</Text>
  <Text style={styles.welcome}>
    {/* Welcome! {auth.currentUser?.email} */}
    早速ルーレットを回して 本日のランチを決めましょう！
  </Text>
</View>;
{
  /* <FetchRestaurants /> */
}
<View style={styles.buttonsBox}>
  <AppButton
    title="ルーレットを回す"
    onPress={() => navigation.navigate('Roulette')}
  />
  <AppButton
    title="Details"
    onPress={() => navigation.navigate('Details')}
  />
  <AppButton
    title="Settings"
    onPress={() => navigation.navigate('Settings')}
  />

  <AppButton title="Map" onPress={() => navigation.navigate('Map')} />
  <AppButton title="Logout" onPress={handleSignOut} />
  <AppButton
    title="Login"
    onPress={() => navigation.navigate('Login')}
  />
</View>;
