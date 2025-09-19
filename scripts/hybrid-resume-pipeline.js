#!/usr/bin/env node

const { execSync } = require('child_process');
const SimpleResumePipeline = require('./simple-resume-pipeline');
const GoogleDriveAPIPipeline = require('./google-drive-api-pipeline');

console.log('🚀 Hybrid Resume Pipeline');
console.log('=========================\n');

class HybridResumePipeline {
  constructor() {
    this.simplePipeline = new SimpleResumePipeline();
    this.googleDriveApiPipeline = new GoogleDriveAPIPipeline();
  }

  async run() {
    try {
      console.log('🔄 Starting hybrid resume pipeline...\n');
      
      // Step 1: Generate website using simple pipeline (reliable, clean data)
      console.log('🌐 Step 1: Generating website resume page from clean data...');
      this.generateWebsiteFromSimpleData();
      console.log('✅ Website resume page updated from clean data');
      
      // Step 2: Generate PDF directly from Google Doc (professional formatting)
      console.log('\n📄 Step 2: Generating PDF from Google Doc...');
      await this.googleDriveApiPipeline.generatePDFFromGoogleDoc();
      console.log('✅ PDF generated from Google Doc');
      
      // Step 3: Build the website
      console.log('\n🏗️  Step 3: Building website...');
      execSync('npm run build:staging', { stdio: 'inherit' });
      console.log('✅ Website built successfully');
      
      console.log('\n🎉 Hybrid resume pipeline completed successfully!');
      console.log('📝 Website updated: /jerry/resume (from clean data)');
      console.log('📄 PDF updated: /jerry-dempsey-resume.pdf (from Google Doc)');
      console.log('\n💡 Benefits of hybrid approach:');
      console.log('   ✅ Reliable website with clean, properly formatted data');
      console.log('   ✅ Professional PDF directly from Google Doc');
      console.log('   ✅ Best of both worlds - reliability + Google Doc integration!');
      
    } catch (error) {
      console.error('\n❌ Hybrid resume pipeline failed:', error.message);
      process.exit(1);
    }
  }

  // Generate website resume page using simple pipeline (reliable, clean data)
  generateWebsiteFromSimpleData() {
    console.log('⚛️  Generating website resume page from clean data...');
    
    // Use the simple pipeline to get reliable data and generate the page
    const resumeData = this.simplePipeline.getResumeData();
    const pageContent = this.simplePipeline.generateResumePage(resumeData);
    
    // Write the file
    const fs = require('fs');
    const path = require('path');
    const resumePagePath = path.join(__dirname, '..', 'src', 'app', 'jerry', 'resume', 'page.tsx');
    fs.writeFileSync(resumePagePath, pageContent);
    console.log('✅ Website resume page updated from clean data');
  }
}

// Run the pipeline
if (require.main === module) {
  new HybridResumePipeline().run();
}

module.exports = HybridResumePipeline;
