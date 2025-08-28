import mongoose from "mongoose";
const tests = [
  {
    testname: "Complete Blood Count (CBC)",
    description:
      "The Complete Blood Count (CBC) test is one of the most commonly ordered blood tests and provides important information about the types and numbers of cells in your blood, including red blood cells, white blood cells, and platelets. It helps detect a variety of conditions such as anemia, infection, and many other disorders. A CBC can also be used to monitor an existing health condition or the effectiveness of a medical treatment. Doctors often recommend this test as part of a routine check-up to assess overall health.",
    preparation: "No special preparation required.",
    price: 400,
    duration: 2,
    category: "Blood Test",
    image:
      "https://www.carehospitals.com/ckfinder/userfiles/images/cbc-blood-test.png",
    lab: "66bda5f2c12e3a9f8d012345",
  },
  {
    testname: "Blood Sugar (Fasting)",
    description:
      "The Fasting Blood Sugar (FBS) test measures the level of glucose in your blood after fasting for at least 8 to 12 hours. It is a primary test used to diagnose diabetes and prediabetes, and is also recommended to monitor blood sugar levels in individuals with diabetes. High levels of glucose in fasting state may indicate that the body is not producing enough insulin or is unable to effectively use the insulin it produces. Regular monitoring can help in early detection and management of diabetes-related complications.",
    preparation:
      "Do not eat or drink (except water) for 8–12 hours before the test.",
    price: 300,
    duration: 1,
    image:
      "https://myhealth-redcliffelabs.redcliffelabs.com/media/blogcard-images/3727/087a5f43-6ecf-4806-927a-bc738a47291a.jpg",
    category: "Blood Test",
    lab: "66bda5f2c12e3a9f8d012345",
  },
  {
    testname: "Lipid Profile",
    description:
      "A Lipid Profile test measures the levels of various types of cholesterol and triglycerides in your blood. It includes total cholesterol, LDL (bad cholesterol), HDL (good cholesterol), and triglycerides. The test helps evaluate the risk of cardiovascular diseases such as heart attack and stroke. High levels of LDL and triglycerides or low levels of HDL can increase the chances of developing heart-related conditions. This test is often recommended as part of a routine health check-up, especially for individuals with risk factors like obesity, smoking, or a family history of heart disease.",
    preparation: "Fast for 9–12 hours before the test.",
    price: 600,
    duration: 2,
    image:
      "https://www.carehospitals.com/ckfinder/userfiles/images/cbc-blood-test.pnghttps://www.lalpathlabs.com/blog/wp-content/uploads/2018/01/Lipid.jpg",

    category: "Blood Test",
    lab: "66bda5f2c12e3a9f8d012345",
  },
  {
    testname: "Liver Function Test (LFT)",
    description:
      "The Liver Function Test (LFT) is a group of blood tests that provide detailed information about the health and function of the liver. These tests measure the levels of liver enzymes, proteins, and bilirubin in the blood. Abnormal results may indicate liver inflammation, infection, or diseases such as hepatitis, fatty liver, or cirrhosis. The LFT is also commonly used to monitor the side effects of medications that may harm the liver and to check the progress of existing liver conditions. Early detection through this test can prevent serious complications related to liver damage.",
    preparation:
      "Avoid alcohol and certain medications before the test, as advised by your doctor.",
    price: 550,
    duration: 3,
    image:
      "https://www.nursingcenter.com/getattachment/8A40D4F8-A561-4494-AB9F-6A0654772EFC/Liver-Function-Tests.aspx",
    category: "Blood Test",
    lab: "66bda5f2c12e3a9f8d012345",
  },
  {
    testname: "Kidney Function Test (KFT)",
    description:
      "The Kidney Function Test (KFT) is a set of blood tests used to assess how well your kidneys are working. It measures the levels of substances like urea, creatinine, and electrolytes in the blood. Abnormal levels may indicate kidney damage, dehydration, or other metabolic issues. The test is essential for patients with conditions such as diabetes, hypertension, or chronic kidney disease. Regular monitoring of kidney function helps in early detection and management of kidney-related problems, preventing them from progressing into more serious complications.",
    preparation:
      "Drink water before the test and avoid heavy physical exercise.",
    price: 500,
    image:
      "https://www.ganeshdiagnostic.com/admin/public/assets/images/blog/banner/mobile/1691413279-Kidney%20Function%20Test.webp",
    duration: 3,
    category: "Blood Test",
    lab: "66bda5f2c12e3a9f8d012345",
  },
  {
    testname: "Thyroid Profile (T3, T4, TSH)",
    description:
      "The Thyroid Profile test measures the levels of thyroid hormones T3 (Triiodothyronine), T4 (Thyroxine), and TSH (Thyroid Stimulating Hormone) in the blood. These hormones regulate many important body functions such as metabolism, energy levels, and growth. Abnormal thyroid levels can lead to conditions like hypothyroidism, hyperthyroidism, or goiter. This test is often recommended for individuals experiencing symptoms such as fatigue, weight changes, hair loss, or irregular heartbeats. Monitoring thyroid function is critical for ensuring overall hormonal balance and well-being.",
    preparation: "No special preparation required.",
    price: 650,
    duration: 2,
    image: "https://cdn1.healthians.com/blog/wp-content/uploads/2021/02/74.jpg",
    category: "Hormone Test",
    lab: "66bda5f2c12e3a9f8d012345",
  },
  {
    testname: "Vitamin D Test",
    description:
      "The Vitamin D Test measures the level of Vitamin D in your blood, which is essential for maintaining strong bones, teeth, and overall immune system health. Vitamin D helps the body absorb calcium, which is vital for bone strength and prevention of conditions like osteoporosis. Low levels of Vitamin D can lead to bone weakness, fatigue, and weakened immunity. This test is commonly recommended for individuals with limited sunlight exposure, older adults, or those experiencing bone or muscle pain.",
    preparation: "No special preparation required.",
    price: 800,
    duration: 4,
    image: "https://www.speedysticks.com/wp-content/uploads/Vitamin-D.jpg",
    category: "Vitamin Test",
    lab: "66bda5f2c12e3a9f8d012345",
  },
  {
    testname: "Vitamin B12 Test",
    description:
      "The Vitamin B12 Test checks the level of Vitamin B12 in your blood, which is essential for maintaining healthy nerve cells, producing DNA, and forming red blood cells. A deficiency in Vitamin B12 can lead to anemia, fatigue, weakness, and neurological issues like memory problems or numbness in hands and feet. This test is recommended for individuals with a vegetarian or vegan diet, as well as those with digestive disorders that affect nutrient absorption. Early detection of B12 deficiency can help prevent long-term nerve damage and other health complications.",
    preparation: "Fasting may be required for 6–8 hours before the test.",
    price: 750,
    duration: 4,
    image:
      "https://sunrisediagnosis.com/wp-content/uploads/2023/03/Vitamin-B12.jpg",
    category: "Vitamin Test",
    lab: "66bda5f2c12e3a9f8d012345",
  },
  {
    testname: "HbA1c (Glycated Hemoglobin)",
    description:
      "The HbA1c test, also known as Glycated Hemoglobin, provides an average of your blood sugar levels over the past 2–3 months. It is one of the most important tests for managing and diagnosing diabetes. Unlike fasting or random blood sugar tests, HbA1c shows long-term glucose control, making it useful for adjusting medications and lifestyle changes. Higher HbA1c levels indicate poor control of diabetes, which may increase the risk of complications such as heart disease, kidney damage, and nerve problems. This test is strongly recommended for all diabetic patients on a regular basis.",
    preparation: "No fasting required for this test.",
    price: 500,
    duration: 2,
    image: "https://healthinfo.healthengine.com.au/assets/iStock-859702858.jpg",
    category: "Diabetes Test",
    lab: "66bda5f2c12e3a9f8d012345",
  },
  {
    testname: "Urine Routine Examination",
    description:
      "The Urine Routine Examination is a simple yet informative test that analyzes various physical, chemical, and microscopic properties of urine. It helps detect urinary tract infections, kidney disorders, metabolic conditions like diabetes, and liver problems. The test looks for abnormalities in color, clarity, specific gravity, pH, glucose, protein, and presence of bacteria or crystals. Doctors often recommend it as part of a regular health check-up or when patients experience symptoms such as frequent urination, burning sensation, or abdominal pain. It provides valuable insights into overall metabolic and kidney health.",
    preparation: "Collect the first-morning urine sample in a clean container.",
    price: 250,
    duration: 1,
    image:
      "https://www.metropolisindia.com/upgrade/blog/upload/24/01/Urinalysis1705069939.webp",
    category: "Urine Test",
    lab: "66bda5f2c12e3a9f8d012345",
  },
];

import Test from "../models/test.model.js";
(async () => {
  try {
    await mongoose.connect(
     process.env.MONGODB_URI
    );
    console.log("Connected to MongoDB");
    await Test.insertMany(tests);
    console.log("Test data seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding test data:", error);
    process.exit(1);
  } finally {
    mongoose.disconnect();
  }
})();
