import { StyleSheet } from 'react-native';
import { AppColors } from '../../utils/colors';
import { height, width } from '../../utils/dimessions';
const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginBottom: height(2),
    backgroundColor: AppColors.red,
    overflow: "hidden"

  },
  container1: {
    width: '89%',
    marginBottom: height(1),
    backgroundColor: AppColors.white,
    overflow: "hidden"

  },
  inputContainer: {
    backgroundColor: AppColors.white,
    height: height(6),
    borderRadius: width(2),
    paddingLeft: width(2),
    color: AppColors.black,
    borderWidth: width(0.3),
    overflow: "hidden",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: width(2)
  },
  input: {
    backgroundColor: AppColors.transparent,
    width: '93%',
    color: AppColors.black,
    height: '100%'
  },
  inputContainer1: {
    backgroundColor: AppColors.lightPrimary5,
    height: height(6),
    color: AppColors.black,
    borderWidth: width(0.3),
    borderRadius: width(2),
    paddingLeft: width(2),
    overflow: "hidden",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: width(2),
    marginTop: height(0.5)
  },
});

export default styles;