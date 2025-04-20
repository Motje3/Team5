import { LinearGradient } from 'expo-linear-gradient';


const Todaysshipment = () => {
    return (
        <LinearGradient
              colors={["#3D0F6E", "#030014"]} // Extra middle color for smoothness
              locations={[0, 0.7, 1]} // Controls smooth transition
              start={{ x: 0.5, y: 0 }} 
              end={{ x: 0.5, y: 0.25 }} // Stops the gradient sooner
              style={{ flex: 1, paddingHorizontal: 24, paddingTop: 40 }} 
            >
            
        </LinearGradient>
    );
};

export default Todaysshipment