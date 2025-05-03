import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Upload, Grid2x2 as Grid, MapPin, Trash2 } from 'lucide-react-native';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

export default function CreateProjectScreen() {
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    grid_size: 9,
    start_date: '',
    end_date: '',
    image_url: '',
  });

  // Handle input changes
  const handleChange = (field: string, value: string | number) => {
    setProjectData({
      ...projectData,
      [field]: value,
    });
  };

  // Handle grid size selection
  const handleGridSizeSelect = (size: number) => {
    handleChange('grid_size', size);
  };

  // Next step
  const handleNextStep = () => {
    setStep(step + 1);
  };

  // Previous step
  const handlePrevStep = () => {
    setStep(step - 1);
  };

  // Handle image upload (mock)
  const handleImageUpload = () => {
    // Mock image URL
    handleChange('image_url', 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg');
  };

  // Handle project creation (mock)
  const handleCreateProject = () => {
    console.log('Project created:', projectData);
    // Reset form and go back to step 1
    setProjectData({
      title: '',
      description: '',
      grid_size: 9,
      start_date: '',
      end_date: '',
      image_url: '',
    });
    setStep(1);
  };

  // Render Basic Info Form
  const renderBasicInfoForm = () => (
    <Card>
      <Text style={styles.cardTitle}>Basic Information</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Project Title *</Text>
        <TextInput
          style={styles.input}
          value={projectData.title}
          onChangeText={(value) => handleChange('title', value)}
          placeholder="Enter a project title"
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={projectData.description}
          onChangeText={(value) => handleChange('description', value)}
          placeholder="Describe your project"
          multiline
          numberOfLines={4}
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Start Date *</Text>
        <TextInput
          style={styles.input}
          value={projectData.start_date}
          onChangeText={(value) => handleChange('start_date', value)}
          placeholder="YYYY-MM-DD"
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>End Date *</Text>
        <TextInput
          style={styles.input}
          value={projectData.end_date}
          onChangeText={(value) => handleChange('end_date', value)}
          placeholder="YYYY-MM-DD"
        />
      </View>
      
      <Button
        title="Continue"
        onPress={handleNextStep}
        fullWidth
        disabled={!projectData.title || !projectData.description || !projectData.start_date || !projectData.end_date}
      />
    </Card>
  );

  // Render Grid Configuration
  const renderGridConfig = () => (
    <Card>
      <Text style={styles.cardTitle}>Grid Configuration</Text>
      <Text style={styles.cardSubtitle}>
        Select the grid size for your project. This will determine how many QR codes and locations are needed.
      </Text>
      
      <View style={styles.gridSizeOptions}>
        {[4, 9, 16, 25, 36].map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.gridSizeOption,
              projectData.grid_size === size && styles.gridSizeOptionSelected,
            ]}
            onPress={() => handleGridSizeSelect(size)}
          >
            <Grid
              size={24}
              color={
                projectData.grid_size === size ? Colors.white : Colors.neutrals[800]
              }
            />
            <Text
              style={[
                styles.gridSizeText,
                projectData.grid_size === size && styles.gridSizeTextSelected,
              ]}
            >
              {Math.sqrt(size)}×{Math.sqrt(size)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.buttonsContainer}>
        <Button
          title="Back"
          onPress={handlePrevStep}
          variant="outline"
          style={{ flex: 1 }}
        />
        <Button
          title="Continue"
          onPress={handleNextStep}
          style={{ flex: 1 }}
        />
      </View>
    </Card>
  );

  // Render Image Upload
  const renderImageUpload = () => (
    <Card>
      <Text style={styles.cardTitle}>Upload Artwork</Text>
      <Text style={styles.cardSubtitle}>
        Upload the artwork image that will be divided into the grid. For best results, use a square image.
      </Text>
      
      {projectData.image_url ? (
        <View style={styles.imagePreviewContainer}>
          <Image
            source={{ uri: projectData.image_url }}
            style={styles.imagePreview}
            resizeMode="cover"
          />
          
          <TouchableOpacity
            style={styles.removeImageButton}
            onPress={() => handleChange('image_url', '')}
          >
            <Trash2 size={18} color={Colors.white} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.uploadContainer}
          onPress={handleImageUpload}
        >
          <Upload size={32} color={Colors.neutrals[500]} />
          <Text style={styles.uploadText}>Click to upload image</Text>
          <Text style={styles.uploadSubtext}>PNG, JPG, WEBP (max 10MB)</Text>
        </TouchableOpacity>
      )}
      
      <View style={styles.buttonsContainer}>
        <Button
          title="Back"
          onPress={handlePrevStep}
          variant="outline"
          style={{ flex: 1 }}
        />
        <Button
          title="Continue"
          onPress={handleNextStep}
          style={{ flex: 1 }}
          disabled={!projectData.image_url}
        />
      </View>
    </Card>
  );

  // Render Location Setup
  const renderLocationSetup = () => (
    <Card>
      <Text style={styles.cardTitle}>Set Up Locations</Text>
      <Text style={styles.cardSubtitle}>
        Next, you'll need to set up locations for each grid cell where users will scan QR codes.
      </Text>
      
      <View style={styles.locationInfo}>
        <MapPin size={24} color={Colors.primary[500]} />
        <Text style={styles.locationText}>
          You'll need to set up {projectData.grid_size} locations for this project.
        </Text>
      </View>
      
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>What happens next?</Text>
        <Text style={styles.infoText}>
          After creating your project, you'll be able to:
        </Text>
        <View style={styles.infoList}>
          <Text style={styles.infoListItem}>• Add locations with GPS coordinates</Text>
          <Text style={styles.infoListItem}>• Generate QR codes for each location</Text>
          <Text style={styles.infoListItem}>• Download printable QR codes</Text>
          <Text style={styles.infoListItem}>• Set up NFT rewards for completion</Text>
        </View>
      </View>
      
      <View style={styles.buttonsContainer}>
        <Button
          title="Back"
          onPress={handlePrevStep}
          variant="outline"
          style={{ flex: 1 }}
        />
        <Button
          title="Create Project"
          onPress={handleCreateProject}
          style={{ flex: 1 }}
        />
      </View>
    </Card>
  );
  
  // Render current step
  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return renderBasicInfoForm();
      case 2:
        return renderGridConfig();
      case 3:
        return renderImageUpload();
      case 4:
        return renderLocationSetup();
      default:
        return renderBasicInfoForm();
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Project</Text>
      </View>
      
      <View style={styles.stepsContainer}>
        {[1, 2, 3, 4].map((stepNumber) => (
          <View key={stepNumber} style={styles.stepIndicatorContainer}>
            <View
              style={[
                styles.stepIndicator,
                stepNumber === step && styles.currentStepIndicator,
                stepNumber < step && styles.completedStepIndicator,
              ]}
            >
              <Text
                style={[
                  styles.stepNumber,
                  (stepNumber === step || stepNumber < step) && styles.activeStepNumber,
                ]}
              >
                {stepNumber}
              </Text>
            </View>
            <View
              style={[
                styles.stepConnector,
                stepNumber < 4 ? styles.showConnector : styles.hideConnector,
                stepNumber < step && styles.completedStepConnector,
              ]}
            />
          </View>
        ))}
      </View>
      
      <View style={styles.stepLabelContainer}>
        <Text style={[styles.stepLabel, step === 1 && styles.currentStepLabel]}>Basic Info</Text>
        <Text style={[styles.stepLabel, step === 2 && styles.currentStepLabel]}>Grid</Text>
        <Text style={[styles.stepLabel, step === 3 && styles.currentStepLabel]}>Image</Text>
        <Text style={[styles.stepLabel, step === 4 && styles.currentStepLabel]}>Locations</Text>
      </View>
      
      {renderCurrentStep()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutrals[50],
  },
  contentContainer: {
    padding: Layout.spacing.md,
    paddingTop: 60,
  },
  header: {
    marginBottom: Layout.spacing.md,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: Colors.neutrals[900],
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.neutrals[200],
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  currentStepIndicator: {
    backgroundColor: Colors.primary[500],
  },
  completedStepIndicator: {
    backgroundColor: Colors.success[500],
  },
  stepNumber: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.neutrals[600],
  },
  activeStepNumber: {
    color: Colors.white,
  },
  stepConnector: {
    height: 2,
    backgroundColor: Colors.neutrals[200],
    flex: 1,
  },
  showConnector: {
    display: 'flex',
  },
  hideConnector: {
    display: 'none',
  },
  completedStepConnector: {
    backgroundColor: Colors.success[500],
  },
  stepLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.md,
    paddingHorizontal: 4,
  },
  stepLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutrals[600],
    textAlign: 'center',
    width: '25%',
  },
  currentStepLabel: {
    fontFamily: 'Inter-SemiBold',
    color: Colors.primary[500],
  },
  cardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.neutrals[900],
    marginBottom: Layout.spacing.sm,
  },
  cardSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutrals[600],
    marginBottom: Layout.spacing.md,
  },
  formGroup: {
    marginBottom: Layout.spacing.md,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutrals[800],
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.neutrals[300],
    borderRadius: Layout.borderRadius.sm,
    padding: Layout.spacing.sm,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  gridSizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.lg,
  },
  gridSizeOption: {
    width: '30%',
    backgroundColor: Colors.neutrals[100],
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  gridSizeOptionSelected: {
    backgroundColor: Colors.primary[500],
  },
  gridSizeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutrals[800],
    marginTop: Layout.spacing.xs,
  },
  gridSizeTextSelected: {
    color: Colors.white,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Layout.spacing.md,
  },
  uploadContainer: {
    borderWidth: 2,
    borderColor: Colors.neutrals[300],
    borderStyle: 'dashed',
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.lg,
  },
  uploadText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutrals[800],
    marginTop: Layout.spacing.sm,
  },
  uploadSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutrals[500],
    marginTop: 4,
  },
  imagePreviewContainer: {
    position: 'relative',
    marginBottom: Layout.spacing.lg,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: Layout.borderRadius.md,
  },
  removeImageButton: {
    position: 'absolute',
    top: Layout.spacing.sm,
    right: Layout.spacing.sm,
    backgroundColor: Colors.error[500],
    borderRadius: 999,
    padding: 8,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutrals[100],
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md,
  },
  locationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutrals[800],
    marginLeft: Layout.spacing.sm,
    flex: 1,
  },
  infoCard: {
    backgroundColor: Colors.primary[50],
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.lg,
  },
  infoTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.primary[700],
    marginBottom: Layout.spacing.sm,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutrals[800],
    marginBottom: 8,
  },
  infoList: {
    marginLeft: Layout.spacing.xs,
  },
  infoListItem: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutrals[800],
    marginBottom: 4,
    lineHeight: 22,
  },
});