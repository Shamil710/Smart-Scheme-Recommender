-- ============================================================
--  GOVERNMENT SCHEMES & SCHOLARSHIPS — INSERT DATA
--  Table: public.schemes
--  Columns: id, name, description, min_age, max_age,
--           income_limit, occupation, category, benefits,
--           documents, apply_link, created_at, state, gender
-- ============================================================

INSERT INTO public.schemes
  (name, description, min_age, max_age, income_limit, occupation, category, benefits, documents, apply_link, state, gender)
VALUES

-- ─────────────────────────────────────────────
--  AGRICULTURE
-- ─────────────────────────────────────────────
(
  'PM Kisan Samman Nidhi',
  'Financial support of Rs.6000 per year to small and marginal farmers in three equal installments of Rs.2000 each, transferred directly to bank accounts.',
  18, 75, 200000, 'farmer', 'all',
  'Rs.6000 per year in 3 installments of Rs.2000 each via Direct Benefit Transfer',
  'Aadhaar Card, Land Records/Khasra, Bank Account Passbook, Mobile Number',
  'https://pmkisan.gov.in',
  'all', 'all'
),
(
  'PM Fasal Bima Yojana',
  'Crop insurance scheme providing financial support to farmers suffering crop loss or damage due to unforeseen events like natural calamities, pests and diseases.',
  18, NULL, 500000, 'farmer', 'all',
  'Insurance coverage for crop loss; low premium 2% for Kharif, 1.5% for Rabi; full sum insured compensation',
  'Aadhaar Card, Land Records, Bank Account, Sown Certificate, Mobile Number',
  'https://pmfby.gov.in',
  'all', 'all'
),
(
  'Kisan Credit Card (KCC)',
  'Provides farmers with affordable credit for agricultural needs including crop cultivation, post-harvest expenses, and allied activities.',
  18, 75, 300000, 'farmer', 'all',
  'Credit up to Rs.3 lakh at 4% interest rate per year; flexible repayment; personal accident insurance cover',
  'Aadhaar Card, Land Records, Passport Photo, Bank Account Details',
  'https://www.nabard.org',
  'all', 'all'
),
(
  'PM Kisan Maan Dhan Yojana',
  'Pension scheme for small and marginal farmers ensuring Rs.3000 per month pension after the age of 60.',
  18, 40, 200000, 'farmer', 'all',
  'Rs.3000/month pension after age 60; equal matching contribution by Government; family pension on death',
  'Aadhaar Card, Bank Account/Jan Dhan Account, Land Records',
  'https://maandhan.in',
  'all', 'all'
),
(
  'Pradhan Mantri Krishi Sinchai Yojana',
  'Aims to provide water to every agricultural field (Har Khet Ko Pani) and improve water use efficiency (More Crop Per Drop).',
  18, NULL, 500000, 'farmer', 'all',
  'Subsidy on micro-irrigation (drip/sprinkler); up to 55% subsidy for small farmers; water conservation support',
  'Aadhaar Card, Land Ownership Documents, Bank Account',
  'https://pmksy.gov.in',
  'all', 'all'
),

-- ─────────────────────────────────────────────
--  HOUSING
-- ─────────────────────────────────────────────
(
  'Pradhan Mantri Awas Yojana - Urban (PMAY-U)',
  'Affordable housing for urban poor through interest subsidy on home loans and direct construction assistance for EWS/LIG/MIG categories.',
  21, NULL, 1800000, 'all', 'all',
  'Interest subsidy up to Rs.2.67 lakh; CLSS subsidy 3%–6.5% on home loans; pucca house for homeless',
  'Aadhaar Card, Income Certificate, Bank Account, Property Documents, No existing pucca house declaration',
  'https://pmaymis.gov.in',
  'all', 'all'
),
(
  'Pradhan Mantri Awas Yojana - Gramin (PMAY-G)',
  'Financial assistance to rural households for construction of pucca houses with basic amenities.',
  21, NULL, 300000, 'all', 'all',
  'Rs.1.20 lakh in plains and Rs.1.30 lakh in hilly areas; Rs.12,000 for toilet under SBM; 90 days MGNREGA labour',
  'Aadhaar Card, BPL Certificate, SECC Data, Bank Account, Land Documents',
  'https://pmayg.nic.in',
  'all', 'all'
),

-- ─────────────────────────────────────────────
--  HEALTH
-- ─────────────────────────────────────────────
(
  'Ayushman Bharat PM-JAY',
  'Health insurance cover of Rs.5 lakh per family per year for secondary and tertiary hospitalisation at empanelled hospitals.',
  0, NULL, 100000, 'all', 'all',
  'Rs.5 lakh health cover per family; cashless treatment at 25,000+ empanelled hospitals; covers pre & post hospitalisation',
  'Aadhaar Card, Ration Card, Income Certificate, SECC/RSBY identification',
  'https://pmjay.gov.in',
  'all', 'all'
),
(
  'PM Jan Arogya Yojana - CAPF',
  'Health coverage for Central Armed Police Force personnel and their dependents for comprehensive medical treatment.',
  18, 60, NULL, 'government employee', 'all',
  'Cashless hospitalisation; Rs.5 lakh cover per family; all critical illness covered',
  'Service ID Card, Aadhaar Card, CAPF Identity Proof',
  'https://pmjay.gov.in',
  'all', 'all'
),
(
  'Rashtriya Arogya Nidhi',
  'Financial assistance to BPL patients suffering from major life-threatening diseases for treatment at super-specialty Government hospitals.',
  0, NULL, 100000, 'all', 'all',
  'One-time financial assistance up to Rs.15 lakh for life-threatening diseases; covers heart surgery, kidney transplant, cancer',
  'Aadhaar Card, BPL Certificate, Medical Certificate from Government Doctor, Hospital Recommendation',
  'https://mohfw.gov.in',
  'all', 'all'
),
(
  'Janani Suraksha Yojana',
  'Safe motherhood intervention to reduce maternal and neo-natal mortality by promoting institutional delivery among poor pregnant women.',
  19, 45, 100000, 'all', 'all',
  'Rs.1400 cash benefit for rural pregnant women; Rs.1000 for urban; free ante-natal checkups; free delivery in government hospitals',
  'Aadhaar Card, MCH Card/Mother & Child Protection Card, BPL Certificate, Bank Account',
  'https://nhm.gov.in',
  'all', 'female'
),

-- ─────────────────────────────────────────────
--  EDUCATION — SCHOLARSHIPS
-- ─────────────────────────────────────────────
(
  'Post Matric Scholarship for SC Students',
  'Financial assistance to SC students studying at post-matriculation or post-secondary stage to enable them to complete their education.',
  14, 30, 250000, 'student', 'SC',
  'Full tuition fee reimbursement; maintenance allowance Rs.380–Rs.1200/month; book grant; study tour allowance',
  'Caste Certificate (SC), Income Certificate, Mark Sheets (Class 10+), Aadhaar Card, Bank Account, Institution Bonafide',
  'https://scholarships.gov.in',
  'all', 'all'
),
(
  'Post Matric Scholarship for ST Students',
  'Financial assistance to Scheduled Tribe students to pursue education beyond Class 10 including technical and professional courses.',
  14, 30, 250000, 'student', 'ST',
  'Full tuition fee reimbursement; maintenance allowance; book allowance; study tour charges; thesis typing charges',
  'ST Caste Certificate, Income Certificate, Mark Sheets, Aadhaar Card, Bank Account, Admission Proof',
  'https://scholarships.gov.in',
  'all', 'all'
),
(
  'Post Matric Scholarship for OBC Students',
  'Financial assistance to OBC students for pursuing post-matriculation education to reduce dropout rates and increase higher education access.',
  14, 30, 100000, 'student', 'OBC',
  'Maintenance allowance Rs.300–Rs.750/month; reimbursement of compulsory non-refundable fees; study tour grant',
  'OBC Certificate (Non-Creamy Layer), Income Certificate, Mark Sheets, Aadhaar Card, Bank Account',
  'https://scholarships.gov.in',
  'all', 'all'
),
(
  'National Means-Cum-Merit Scholarship (NMMS)',
  'Award to meritorious students of economically weaker sections to arrest their dropout at Class 8 and encourage them to continue study up to Class 12.',
  13, 18, 150000, 'student', 'all',
  'Rs.12,000 per year (Rs.1000/month) scholarship from Class 9 to Class 12; renewed every year on passing',
  'Income Certificate, Mark Sheets (Class 7 & 8), School Certificate, Aadhaar Card, Bank Account',
  'https://scholarships.gov.in',
  'all', 'all'
),
(
  'Central Sector Scheme of Scholarships for College Students',
  'Scholarships to meritorious students from low income families to meet day-to-day expenses while pursuing higher education.',
  17, 25, 450000, 'student', 'all',
  'Rs.10,000/year for freshers & Rs.20,000/year at PG level; renewable up to 5 years; direct bank transfer',
  'Class 12 Mark Sheet, Income Certificate, Aadhaar Card, Bank Account, Institution Enrollment Certificate',
  'https://scholarships.gov.in',
  'all', 'all'
),
(
  'Prime Minister Research Fellowship (PMRF)',
  'Fellowship for meritorious students to take up PhD in IITs, IISc and NIT for carrying out research in cutting edge science and technology.',
  21, 35, NULL, 'student', 'all',
  'Monthly stipend Rs.70,000–Rs.80,000; research grant Rs.2 lakh/year; upgraded research infrastructure access',
  'B.Tech/M.Tech/M.Sc Mark Sheets, Aadhaar Card, Research Proposal, Bank Account, Institution Letter',
  'https://pmrf.in',
  'all', 'all'
),
(
  'Ishan Uday Scholarship for North-East Students',
  'Special scholarship scheme for students from North-Eastern region to pursue general degree, technical and professional courses.',
  17, 30, 450000, 'student', 'all',
  'Rs.5400/month for general courses; Rs.7800/month for technical/medical; covers tuition and living expenses',
  'Class 12 Mark Sheet, Domicile Certificate (North East State), Income Certificate, Aadhaar Card, Bank Account',
  'https://scholarships.gov.in',
  'all', 'all'
),
(
  'Pragati Scholarship for Technical Education (Girls)',
  'Scholarship to support girl students pursuing technical education to encourage women participation in AICTE approved institutions.',
  17, 30, 800000, 'student', 'all',
  'Rs.50,000 per year or actual tuition fee whichever is less; covers academic expenses; one-time Rs.2000 laptop allowance',
  'AICTE Institution Enrollment, Class 12 Marksheet, Income Certificate, Aadhaar Card, Bank Account',
  'https://scholarships.gov.in',
  'all', 'female'
),
(
  'Saksham Scholarship for Differently Abled',
  'Scholarship for differently abled students pursuing technical education at degree and diploma level in AICTE approved institutions.',
  17, 30, 800000, 'student', 'all',
  'Rs.50,000 per year or actual tuition fee; Rs.2000 special allowance; assistive device support',
  'Disability Certificate (40%+ disability), Enrollment Certificate, Income Certificate, Aadhaar Card, Bank Account',
  'https://scholarships.gov.in',
  'all', 'all'
),

-- ─────────────────────────────────────────────
--  WOMEN WELFARE
-- ─────────────────────────────────────────────
(
  'Sukanya Samriddhi Yojana',
  'Small savings scheme for the girl child to ensure financial security for education and marriage, with high interest rate and tax benefits.',
  0, 10, NULL, 'all', 'all',
  'Interest rate 8.2% per annum; tax deduction under Section 80C; partial withdrawal at age 18 for education; maturity at 21',
  'Girl Child Birth Certificate, Parent/Guardian Aadhaar, Parent/Guardian PAN, Address Proof, Passport Photo',
  'https://www.nsiindia.gov.in',
  'all', 'female'
),
(
  'Beti Bachao Beti Padhao',
  'Multi-sectoral scheme to address declining Child Sex Ratio and promote welfare, education and protection of the girl child.',
  0, 18, 300000, 'all', 'all',
  'Educational scholarships; skill development programs; awareness and sensitisation campaigns; conditional cash transfer in select states',
  'Birth Certificate, Aadhaar Card, School Enrollment Proof, Parent Income Certificate',
  'https://wcd.nic.in',
  'all', 'female'
),
(
  'Mahila Shakti Kendra Scheme',
  'Empowers rural women through community participation and creates an environment in which they realise their full potential.',
  18, 60, 300000, 'all', 'all',
  'Skill development training; digital literacy; legal awareness; nutrition and health education; livelihood support',
  'Aadhaar Card, BPL Certificate, Residence Proof, Bank Account',
  'https://wcd.nic.in',
  'all', 'female'
),
(
  'PM Matru Vandana Yojana (PMMVY)',
  'Maternity benefit programme providing partial wage compensation to pregnant and lactating mothers to compensate for wage loss.',
  19, 45, 800000, 'all', 'all',
  'Rs.5000 cash incentive in three installments for first live birth; nutrition support; free ante-natal care',
  'Aadhaar Card, MCP Card, Bank Account, Pregnancy Registration Certificate, LMP Certificate',
  'https://wcd.nic.in',
  'all', 'female'
),
(
  'Stand-Up India Scheme',
  'Facilitates bank loans between Rs.10 lakh and Rs.1 crore to SC/ST and women entrepreneurs for greenfield enterprises.',
  21, NULL, NULL, 'self-employed', 'SC/ST/Women',
  'Loans Rs.10 lakh to Rs.1 crore at concessional rates; 75% of project cost; 7-year repayment; handholding support',
  'Aadhaar Card, Business Plan/Project Report, Income Proof, Caste Certificate (if SC/ST), Bank Account',
  'https://www.standupmitra.in',
  'all', 'all'
),

-- ─────────────────────────────────────────────
--  LABOUR & EMPLOYMENT
-- ─────────────────────────────────────────────
(
  'MGNREGA (Mahatma Gandhi NREGS)',
  'Guarantees 100 days of wage employment per year to every rural household to enhance livelihood security and create durable assets.',
  18, NULL, 120000, 'daily wage worker', 'all',
  '100 days guaranteed employment per year; equal wages for men and women; unemployment allowance if work not provided within 15 days',
  'Aadhaar Card, Job Card (issued by Gram Panchayat), Bank/Post Office Account',
  'https://nrega.nic.in',
  'all', 'all'
),
(
  'PM Shram Yogi Maan-Dhan (PM-SYM)',
  'Pension scheme for unorganised workers ensuring minimum Rs.3000 per month pension after age 60 with government matching contribution.',
  18, 40, 180000, 'daily wage worker', 'all',
  'Rs.3000/month pension after 60; equal government matching contribution; family pension Rs.1500/month on death',
  'Aadhaar Card, Savings Bank/Jan Dhan Account, Mobile Number',
  'https://maandhan.in',
  'all', 'all'
),
(
  'PM Employees Provident Fund (EPF)',
  'Mandatory social security scheme for employees to build retirement corpus with employer and employee equal contributions.',
  18, 58, NULL, 'salaried', 'all',
  '12% employee + 12% employer contribution; 8.25% interest rate; pension through EPS; insurance through EDLI; lump sum on retirement',
  'Aadhaar Card, PAN Card, Bank Account, Employer Registration',
  'https://www.epfindia.gov.in',
  'all', 'all'
),
(
  'PM Suraksha Bima Yojana',
  'Accidental insurance scheme offering Rs.2 lakh accident death/disability cover at just Rs.20 per year premium.',
  18, 70, NULL, 'all', 'all',
  'Rs.2 lakh accidental death cover; Rs.2 lakh permanent disability; Rs.1 lakh partial disability; only Rs.20/year premium',
  'Aadhaar Card, Savings Bank Account, Mobile Number',
  'https://jansuraksha.gov.in',
  'all', 'all'
),
(
  'PM Jeevan Jyoti Bima Yojana',
  'Term life insurance scheme providing Rs.2 lakh death cover at Rs.436 per year for individuals aged 18–50.',
  18, 50, NULL, 'all', 'all',
  'Rs.2 lakh life cover on death; renewable annually; low premium Rs.436/year; auto-debit from bank account',
  'Aadhaar Card, Savings Bank Account, Mobile Number, Health Declaration',
  'https://jansuraksha.gov.in',
  'all', 'all'
),
(
  'Atal Pension Yojana (APY)',
  'Guaranteed pension scheme for unorganised sector workers with government co-contribution of 50% for first 5 years.',
  18, 40, 300000, 'all', 'all',
  'Guaranteed pension Rs.1000–Rs.5000/month after 60; government co-contribution 50%; spouse continues pension; lump sum to nominee',
  'Aadhaar Card, Savings Bank Account, Mobile Number',
  'https://npscra.nsdl.co.in',
  'all', 'all'
),
(
  'National Career Service Portal',
  'One-stop platform for various employment-related services including job matching, career counselling, and skill development.',
  18, 45, NULL, 'unemployed', 'all',
  'Free job matching; career counselling; apprenticeship opportunities; internship listing; skill development courses',
  'Aadhaar Card, Educational Certificates, Resume/CV',
  'https://www.ncs.gov.in',
  'all', 'all'
),

-- ─────────────────────────────────────────────
--  BUSINESS & ENTREPRENEURSHIP
-- ─────────────────────────────────────────────
(
  'PM MUDRA Yojana — Shishu',
  'Micro-finance loans up to Rs.50,000 for micro enterprises in manufacturing, trading and services sector.',
  18, 65, 300000, 'self-employed', 'all',
  'Collateral-free loan up to Rs.50,000; low interest rates; no processing fee; flexible repayment up to 5 years',
  'Aadhaar Card, Business Plan, Identity Proof, Address Proof, Bank Account',
  'https://mudra.org.in',
  'all', 'all'
),
(
  'PM MUDRA Yojana — Kishor',
  'Micro-finance loans from Rs.50,000 to Rs.5 lakh for established micro enterprises looking to expand.',
  18, 65, 1000000, 'self-employed', 'all',
  'Loan Rs.50,000 to Rs.5 lakh; competitive interest rates; no collateral; MUDRA card for working capital; repayment 3–5 years',
  'Aadhaar Card, Business Proof, 6 months Bank Statement, Income Proof, Trade License',
  'https://mudra.org.in',
  'all', 'all'
),
(
  'PM MUDRA Yojana — Tarun',
  'Loans from Rs.5 lakh to Rs.10 lakh for well-established micro enterprises for expansion and modernisation.',
  18, 65, 3000000, 'self-employed', 'all',
  'Loan Rs.5 lakh to Rs.10 lakh; competitive interest rates; flexible collateral norms; repayment up to 7 years',
  'Aadhaar Card, 2-year Business Proof, IT Returns, Balance Sheet, Bank Statement, Collateral if available',
  'https://mudra.org.in',
  'all', 'all'
),
(
  'PM Employment Generation Programme (PMEGP)',
  'Credit-linked subsidy scheme to generate employment by establishing micro enterprises in non-farm sector.',
  18, NULL, NULL, 'unemployed', 'all',
  'Subsidy 15–35% of project cost; manufacturing projects up to Rs.50 lakh; service sector up to Rs.20 lakh; margin money support',
  'Aadhaar Card, Educational Certificate (Class 8 for projects above Rs.10L), Project Report, Bank Account',
  'https://www.kviconline.gov.in',
  'all', 'all'
),
(
  'Startup India Seed Fund Scheme',
  'Provides financial assistance to startups for proof of concept, prototype development, product trials and market entry.',
  21, 45, NULL, 'self-employed', 'all',
  'Seed funding up to Rs.20 lakh for PoC; up to Rs.50 lakh for prototype/trials; mentorship and incubation support',
  'DPIIT Startup Recognition, Business Plan, Aadhaar Card, PAN, CA Certificate',
  'https://startupindia.gov.in',
  'all', 'all'
),

-- ─────────────────────────────────────────────
--  SENIOR CITIZENS
-- ─────────────────────────────────────────────
(
  'Indira Gandhi National Old Age Pension',
  'Monthly pension for BPL elderly persons to ensure social security and financial stability in old age.',
  60, NULL, 100000, 'all', 'all',
  'Rs.200/month for age 60–79; Rs.500/month for age 80+; direct bank transfer; state may add top-up',
  'Aadhaar Card, BPL Certificate, Age Proof (Birth Certificate/School Certificate), Bank Account',
  'https://nsap.nic.in',
  'all', 'all'
),
(
  'Varishtha Pension Bima Yojana',
  'Pension scheme operated by LIC offering guaranteed minimum pension to senior citizens with a one-time lump sum purchase price.',
  60, NULL, NULL, 'retired', 'all',
  'Guaranteed return 7.4% per annum; pension monthly/quarterly/half-yearly/yearly options; return of purchase price on death',
  'Aadhaar Card, Age Proof, PAN Card, Bank Account, Medical Certificate',
  'https://licindia.in',
  'all', 'all'
),
(
  'Rashtriya Vayoshri Yojana',
  'Scheme for providing assisted-living devices and aids to senior citizens belonging to BPL category.',
  60, NULL, 100000, 'all', 'all',
  'Free assistive living devices: walking sticks, elbow crutches, tripods, hearing aids, spectacles, wheelchairs as per requirement',
  'Aadhaar Card, BPL Certificate, Age Proof, Medical Certificate from Government Doctor',
  'https://www.alimco.in',
  'all', 'all'
),

-- ─────────────────────────────────────────────
--  PERSONS WITH DISABILITIES
-- ─────────────────────────────────────────────
(
  'Indira Gandhi National Disability Pension',
  'Monthly pension for persons with severe or multiple disabilities belonging to BPL household.',
  18, 79, 100000, 'all', 'all',
  'Rs.300/month pension; additional state top-up varies by state; direct bank transfer under DBT',
  'Aadhaar Card, Disability Certificate (80%+ disability), BPL Certificate, Bank Account',
  'https://nsap.nic.in',
  'all', 'all'
),
(
  'ADIP Scheme (Assistance for Disabled Persons)',
  'Assistance to differently abled persons for purchase/fitting of modern, standard artificial limbs and aids.',
  0, NULL, 200000, 'all', 'all',
  'Free assistive devices and aids; artificial limbs; hearing aids; wheelchairs; braille kits; Rs.4500–Rs.10,000 per device',
  'Aadhaar Card, Disability Certificate (40%+ disability), Income Certificate, Prescription from Medical Authority',
  'https://www.alimco.in',
  'all', 'all'
),
(
  'National Fellowship for Differently Abled Students',
  'Fellowship to support higher education of students with disabilities pursuing M.Phil or PhD courses.',
  18, 35, NULL, 'student', 'all',
  'Rs.31,000/month JRF fellowship; Rs.35,000/month SRF; contingency grant Rs.10,000/year; 200 fellowships per year',
  'Disability Certificate (40%+), UGC/CSIR NET qualification, Enrollment Certificate, Aadhaar Card, Bank Account',
  'https://ugc.ac.in',
  'all', 'all'
),

-- ─────────────────────────────────────────────
--  SKILL DEVELOPMENT
-- ─────────────────────────────────────────────
(
  'PM Kaushal Vikas Yojana (PMKVY)',
  'Flagship scheme to enable Indian youth to take industry-relevant skill training and get certified for better employment opportunities.',
  15, 45, 300000, 'unemployed', 'all',
  'Free short-term skill training (150–300 hours); certification by NSDC; placement assistance; Rs.500 reward on certification',
  'Aadhaar Card, Educational Certificate, Bank Account, Mobile Number, Passport Photo',
  'https://www.pmkvyofficial.org',
  'all', 'all'
),
(
  'NAPS — National Apprenticeship Promotion Scheme',
  'Promotes apprenticeship training by sharing 25% of prescribed stipend with employers to increase apprenticeship opportunities.',
  14, 35, NULL, 'unemployed', 'all',
  'Stipend Rs.5000–Rs.9000/month; 25% government contribution to employer; structured on-the-job training; NCVT certificate',
  'Aadhaar Card, Educational Certificates, Bank Account',
  'https://apprenticeship.gov.in',
  'all', 'all'
),
(
  'DDU-GKY (Deen Dayal Upadhyaya Grameen Kaushalya Yojana)',
  'Placement-linked skill training programme for rural poor youth under MGNREGS to provide wage employment.',
  15, 35, 100000, 'unemployed', 'all',
  'Free skill training; guaranteed placement assistance; minimum Rs.6000/month post-training salary; free food and accommodation during training',
  'Aadhaar Card, BPL/MGNREGS Family Card, Educational Certificate, Bank Account',
  'https://ddugky.gov.in',
  'all', 'all'
),

-- ─────────────────────────────────────────────
--  FINANCIAL INCLUSION
-- ─────────────────────────────────────────────
(
  'PM Jan Dhan Yojana',
  'National financial inclusion mission to ensure affordable financial services — banking, remittances, credit, insurance, pension to all households.',
  10, NULL, NULL, 'all', 'all',
  'Zero balance savings account; RuPay debit card; Rs.2 lakh accident insurance; Rs.30,000 life cover; Rs.10,000 overdraft facility',
  'Aadhaar Card or any government ID, Address Proof, Passport Photo',
  'https://pmjdy.gov.in',
  'all', 'all'
),
(
  'PM Vaya Vandana Yojana (PMVVY)',
  'Pension scheme for senior citizens to provide regular income through assured pension and protect against uncertain market conditions.',
  60, NULL, NULL, 'retired', 'all',
  'Assured pension 7.4% per annum; pension Rs.1000–Rs.9250/month; loan facility after 3 years; surrender value on critical illness',
  'Aadhaar Card, Age Proof, PAN Card, Bank Account, Cancelled Cheque',
  'https://licindia.in',
  'all', 'all'
),

-- ─────────────────────────────────────────────
--  Tamil NADU SPECIFIC SCHEMES
-- ─────────────────────────────────────────────
(
  'TN Chief Minister''s Comprehensive Health Insurance',
  'Health insurance scheme for low-income Tamil Nadu families providing comprehensive cashless medical treatment.',
  0, NULL, 72000, 'all', 'all',
  'Rs.5 lakh cover per family per year; 1099 procedures covered; cashless treatment at 1000+ hospitals; Rs.4 lakh accident cover',
  'Aadhaar Card, Ration Card (eligible categories), Government Income Certificate, Family ID Card',
  'https://www.cmchistn.com',
  'Tamil Nadu', 'all'
),
(
  'TN Amma Two-Wheeler Scheme',
  'Subsidised two-wheeler scheme for working women in Tamil Nadu to enhance mobility and employment.',
  18, 40, 250000, 'all', 'all',
  '50% subsidy up to Rs.25,000 on two-wheeler purchase; EMI support; insurance coverage; applicable to working women only',
  'Aadhaar Card, Income Certificate, Employment/Service Certificate, Residence Proof, Bank Account',
  'https://www.tn.gov.in',
  'Tamil Nadu', 'female'
),
(
  'TN Moovalur Ramamirtham Ammaiyar Ninaivu Marriage Assistance',
  'Financial assistance for the marriage of first daughter in families with no male children or daughters of widows in Tamil Nadu.',
  18, 25, 72000, 'all', 'all',
  'Rs.50,000 total assistance: Rs.25,000 as FD for 5 years + Rs.4,000 gold + Rs.5,000 utensils for SC/ST; Rs.22,000 cash for others',
  'Aadhaar Card, Birth Certificate, Income Certificate, Community Certificate, Marriage Invitation, Ration Card',
  'https://www.tn.gov.in',
  'Tamil Nadu', 'female'
),
(
  'TN Dr. Muthulakshmi Reddy Maternity Benefit Scheme',
  'Financial assistance to pregnant women workers and wives of workers in unorganised sector in Tamil Nadu for safe delivery.',
  19, 45, 120000, 'all', 'all',
  'Rs.18,000 total: Rs.12,000 in 3 installments + Rs.4,000 nutrition kit + Rs.2,000 at birth; for first 2 deliveries only',
  'Aadhaar Card, Ration Card, Income Certificate, Pregnancy Certificate, Bank Account',
  'https://www.tn.gov.in',
  'Tamil Nadu', 'female'
),
(
  'Pudhumai Penn Scholarship (TN)',
  'Scholarship for girl students studying in government schools who pursue higher education in Tamil Nadu.',
  17, 25, 250000, 'student', 'all',
  'Rs.1,000/month for diploma/polytechnic; Rs.1,500/month for degree courses; Rs.2,000/month for professional courses',
  'Aadhaar Card, Class 12 Mark Sheet (Government School), Enrollment Certificate, Income Certificate, Bank Account',
  'https://www.tn.gov.in',
  'Tamil Nadu', 'female'
);

-- ============================================================
-- Total: 55 schemes inserted
-- Run: SELECT COUNT(*) FROM public.schemes;  — to verify
-- ============================================================
