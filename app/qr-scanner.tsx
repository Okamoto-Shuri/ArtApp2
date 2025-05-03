import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { ChevronLeft, Loader as Loader2 } from 'lucide-react-native';
import QRScannerOverlay from '@/components/ui/QRScannerOverlay';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import api from '@/api/client';

export default function QRScannerScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [isFacing, setIsFacing] = useState<CameraType>('back');
  const [isScanning, setIsScanning] = useState(true);
  const [scanResult, setScanResult] = useState<null | {
    success: boolean;
    message: string;
    projectId?: string;
  }>(null);
  
  // Handle going back
  const handleBack = () => {
    router.back();
  };
  
  // Handle QR code scan
  const handleBarCodeScanned = async ({ data }: { type: string; data: string }) => {
    if (!isScanning) return;
    
    setIsScanning(false);
    
    try {
      // In a real app, send the QR code data to the server
      // const response = await api.scanQRCode(data);
      
      // Mock response for demonstration
      const mockResponse = {
        success: true,
        message: 'QR code scanned successfully!',
        project_id: '1',
        is_completed: false,
      };
      
      // Set scan result
      setScanResult({
        success: mockResponse.success,
        message: mockResponse.message,
        projectId: mockResponse.project_id,
      });
      
      // If project is completed, auto-navigate to project details after delay
      if (mockResponse.is_completed) {
        setTimeout(() => {
          router.replace(`/projects/${mockResponse.project_id}`);
        }, 2000);
      }
      
    } catch (error) {
      console.error('Error scanning QR code:', error);
      
      setScanResult({
        success: false,
        message: 'Failed to scan QR code. Please try again.',
      });
      
      // Re-enable scanning after a delay
      setTimeout(() => {
        setIsScanning(true);
        setScanResult(null);
      }, 3000);
    }
  };
  
  // Handle scan again button press
  const handleScanAgain = () => {
    setIsScanning(true);
    setScanResult(null);
  };
  
  // Handle view project button press
  const handleViewProject = () => {
    if (scanResult?.projectId) {
      router.replace(`/projects/${scanResult.projectId}`);
    }
  };
  
  // Request camera permission if not granted
  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);
  
  // Render based on permission status
  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <Loader2 size={40} color={Colors.primary[500]} />
        <Text style={styles.loadingText}>Loading camera...</Text>
      </View>
    );
  }
  
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionTitle}>Camera Permission Required</Text>
        <Text style={styles.permissionText}>
          We need camera permission to scan QR codes. Please grant permission to continue.
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        type={isFacing}
        barCodeScannerSettings={{
          barCodeTypes: ['qr'],
        }}
        onBarCodeScanned={isScanning ? handleBarCodeScanned : undefined}
      >
        {/* Scanner overlay */}
        {isScanning && <QRScannerOverlay />}
        
        {/* Header controls */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
          >
            <ChevronLeft size={24} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.title}>Scan QR Code</Text>
        </View>
        
        {/* Result overlay */}
        {scanResult && (
          <View style={styles.resultOverlay}>
            <View style={styles.resultCard}>
              <View 
                style={[
                  styles.resultIconContainer,
                  scanResult.success ? styles.successIconContainer : styles.errorIconContainer
                ]}
              >
                {scanResult.success ? (
                  <Text style={styles.checkmark}>✓</Text>
                ) : (
                  <Text style={styles.errorMark}>✕</Text>
                )}
              </View>
              
              <Text style={styles.resultTitle}>
                {scanResult.success ? 'Success!' : 'Error'}
              </Text>
              
              <Text style={styles.resultMessage}>{scanResult.message}</Text>
              
              <View style={styles.resultActions}>
                {scanResult.success ? (
                  <>
                    <TouchableOpacity
                      style={[styles.resultButton, styles.secondaryButton]}
                      onPress={handleScanAgain}
                    >
                      <Text style={styles.secondaryButtonText}>Scan Again</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[styles.resultButton, styles.primaryButton]}
                      onPress={handleViewProject}
                    >
                      <Text style={styles.primaryButtonText}>View Project</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    style={[styles.resultButton, styles.primaryButton]}
                    onPress={handleScanAgain}
                  >
                    <Text style={styles.primaryButtonText}>Try Again</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}
        
        {/* Instructions */}
        {isScanning && (
          <View style={styles.instructionsContainer}>
            <View style={styles.instructions}>
              <Text style={styles.instructionsText}>
                Position the QR code within the frame to scan
              </Text>
            </View>
          </View>
        )}
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  camera: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.md,
    paddingTop: Platform.OS === 'web' ? Layout.spacing.md : 50,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: Colors.white,
    marginLeft: Layout.spacing.md,
  },
  instructionsContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  instructions: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.borderRadius.pill,
  },
  instructionsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.white,
    textAlign: 'center',
  },
  resultOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.md,
  },
  resultCard: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.lg,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  resultIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  successIconContainer: {
    backgroundColor: Colors.success[100],
  },
  errorIconContainer: {
    backgroundColor: Colors.error[100],
  },
  checkmark: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: Colors.success[500],
  },
  errorMark: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: Colors.error[500],
  },
  resultTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: Colors.neutrals[900],
    marginBottom: Layout.spacing.sm,
  },
  resultMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutrals[700],
    textAlign: 'center',
    marginBottom: Layout.spacing.lg,
  },
  resultActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: Layout.spacing.md,
  },
  resultButton: {
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    flex: 1,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.primary[500],
  },
  secondaryButton: {
    backgroundColor: Colors.neutrals[100],
  },
  primaryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.white,
  },
  secondaryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutrals[800],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  loadingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutrals[800],
    marginTop: Layout.spacing.md,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Layout.spacing.xl,
  },
  permissionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: Colors.neutrals[900],
    marginBottom: Layout.spacing.md,
    textAlign: 'center',
  },
  permissionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutrals[700],
    textAlign: 'center',
    marginBottom: Layout.spacing.xl,
  },
  permissionButton: {
    backgroundColor: Colors.primary[500],
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.md,
  },
  permissionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.white,
  },
});