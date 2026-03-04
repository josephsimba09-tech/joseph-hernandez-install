import requests
import sys
import json
from datetime import datetime

class ProAVTechAPITester:
    def __init__(self, base_url="https://event-tech-hub-2.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details
        })

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            if success:
                self.log_test(name, True, f"Status: {response.status_code}")
                try:
                    return True, response.json()
                except:
                    return True, response.text
            else:
                self.log_test(name, False, f"Expected {expected_status}, got {response.status_code}. Response: {response.text[:200]}")
                return False, {}

        except requests.exceptions.RequestException as e:
            self.log_test(name, False, f"Request error: {str(e)}")
            return False, {}
        except Exception as e:
            self.log_test(name, False, f"Unexpected error: {str(e)}")
            return False, {}

    def test_health_endpoints(self):
        """Test basic health endpoints"""
        print("\n🔍 Testing Health Endpoints...")
        
        # Test root endpoint
        self.run_test("API Root", "GET", "", 200)
        
        # Test health check
        self.run_test("Health Check", "GET", "health", 200)

    def test_booking_creation(self):
        """Test booking inquiry creation"""
        print("\n🔍 Testing Booking Creation...")
        
        # Test valid booking creation
        valid_booking = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "(555) 123-4567",
            "event_type": "Trade Show",
            "event_date": "2024-12-15",
            "budget": "$15,000 - $50,000",
            "location": "Las Vegas, NV",
            "details": "Need stage setup and video walls for tech conference"
        }
        
        success, response = self.run_test(
            "Create Valid Booking",
            "POST",
            "bookings",
            200,  # API returns 200, not 201
            data=valid_booking
        )
        
        booking_id = None
        if success and isinstance(response, dict) and 'id' in response:
            booking_id = response['id']
            print(f"   Created booking with ID: {booking_id}")
        
        # Test booking with minimal required fields
        minimal_booking = {
            "name": "Jane Smith",
            "email": "jane.smith@example.com",
            "event_type": "Corporate Event"
        }
        
        self.run_test(
            "Create Minimal Booking",
            "POST",
            "bookings",
            201,
            data=minimal_booking
        )
        
        # Test invalid booking (missing required fields)
        invalid_booking = {
            "email": "invalid@example.com"
            # Missing name and event_type
        }
        
        self.run_test(
            "Create Invalid Booking (Missing Fields)",
            "POST",
            "bookings",
            422,  # Validation error
            data=invalid_booking
        )
        
        return booking_id

    def test_booking_retrieval(self, booking_id=None):
        """Test booking retrieval endpoints"""
        print("\n🔍 Testing Booking Retrieval...")
        
        # Test get all bookings
        success, response = self.run_test(
            "Get All Bookings",
            "GET",
            "bookings",
            200
        )
        
        if success and isinstance(response, list):
            print(f"   Found {len(response)} bookings")
            
            # Test get specific booking if we have an ID
            if booking_id and len(response) > 0:
                self.run_test(
                    "Get Specific Booking",
                    "GET",
                    f"bookings/{booking_id}",
                    200
                )
        
        # Test get non-existent booking
        self.run_test(
            "Get Non-existent Booking",
            "GET",
            "bookings/non-existent-id",
            404
        )

    def test_booking_status_update(self, booking_id=None):
        """Test booking status updates"""
        print("\n🔍 Testing Booking Status Updates...")
        
        if booking_id:
            # Test valid status update
            self.run_test(
                "Update Booking Status",
                "PATCH",
                f"bookings/{booking_id}/status?status=contacted",
                200
            )
        
        # Test update non-existent booking
        self.run_test(
            "Update Non-existent Booking Status",
            "PATCH",
            "bookings/non-existent-id/status?status=contacted",
            404
        )

    def test_form_validation(self):
        """Test various form validation scenarios"""
        print("\n🔍 Testing Form Validation...")
        
        # Test invalid email format
        invalid_email_booking = {
            "name": "Test User",
            "email": "invalid-email",
            "event_type": "Trade Show"
        }
        
        self.run_test(
            "Invalid Email Format",
            "POST",
            "bookings",
            422,
            data=invalid_email_booking
        )
        
        # Test empty required fields
        empty_fields_booking = {
            "name": "",
            "email": "",
            "event_type": ""
        }
        
        self.run_test(
            "Empty Required Fields",
            "POST",
            "bookings",
            422,
            data=empty_fields_booking
        )

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Pro AV Tech API Tests...")
        print(f"Testing against: {self.api_url}")
        
        # Run test suites
        self.test_health_endpoints()
        booking_id = self.test_booking_creation()
        self.test_booking_retrieval(booking_id)
        self.test_booking_status_update(booking_id)
        self.test_form_validation()
        
        # Print summary
        print(f"\n📊 Test Summary:")
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        return self.tests_passed == self.tests_run

def main():
    tester = ProAVTechAPITester()
    success = tester.run_all_tests()
    
    # Save detailed results
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            'timestamp': datetime.now().isoformat(),
            'total_tests': tester.tests_run,
            'passed_tests': tester.tests_passed,
            'success_rate': (tester.tests_passed/tester.tests_run)*100 if tester.tests_run > 0 else 0,
            'results': tester.test_results
        }, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())