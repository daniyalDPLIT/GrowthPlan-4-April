import { StyleSheet } from 'react-native';
import { AppColors } from '../../utils/colors';
import { height, width } from '../../utils/dimessions';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.white,
        // paddingTop: height(4)
    },
    header: {
        width: width(100),
        paddingTop: height(7),
        paddingBlockEnd: height(2),
        alignItems: "center",
        backgroundColor: AppColors.primary
    },
    inputContainer: {
        alignItems: "center",
        marginTop: height(2)
    },
    button: {
        marginTop: height(2)
    },
    loaderContainer: {
        marginTop: height(3)

    },
    cover: {
        height: height(20),
        width: width(90),
        overflow: "hidden"
    },
    interecationItem: {
        width: width(90),
        alignSelf: "center",
        marginTop: height(2),
        borderWidth: width(0.2),
        borderRadius: width(2),
        overflow: "hidden",
        paddingBlockEnd: width(3),
        borderColor: AppColors.white5
    },
    innerContent: {
        paddingHorizontal: width(3),
        paddingTop: height(1)
    },
    flatListContainer: {
        paddingBottom: height(2)
    },
    logout: {
        alignSelf: "flex-end",
        marginRight: width(6),
        padding: width(3),
        backgroundColor: AppColors.red,
        marginTop: height(1),
        borderRadius: width(10),
    }
});

export default styles;