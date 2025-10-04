import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courseService } from '../services/api';
import { ChevronDown, ChevronUp, Download, Clock, BarChart3 } from 'lucide-react';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState(new Set());

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const response = await courseService.getCourse(id);
        let courseData = response.data;

        // If this is an Azure course and doesn't have modules, add the Azure curriculum
        if (courseData.title.toLowerCase().includes('azure') && (!courseData.modules || courseData.modules.length === 0)) {
          courseData = {
            ...courseData,
            modules: getAzureCourseModules()
          };
        }

        // If this is a Terraform course and doesn't have modules, add the Terraform curriculum
        if (courseData.title.toLowerCase().includes('terraform') && (!courseData.modules || courseData.modules.length === 0)) {
          courseData = {
            ...courseData,
            modules: getTerraformCourseModules()
          };
        }

        // If this is a Docker course and doesn't have modules, add the Docker curriculum
        if (courseData.title.toLowerCase().includes('docker') && (!courseData.modules || courseData.modules.length === 0)) {
          courseData = {
            ...courseData,
            modules: getDockerCourseModules()
          };
        }

        // If this is a Git course and doesn't have modules, add the Git curriculum
        if (courseData.title.toLowerCase().includes('git') && (!courseData.modules || courseData.modules.length === 0)) {
          courseData = {
            ...courseData,
            modules: getGitCourseModules()
          };
        }

        // If this is a Kubernetes course and doesn't have modules, add the Kubernetes curriculum
        if (courseData.title.toLowerCase().includes('kubernetes') && (!courseData.modules || courseData.modules.length === 0)) {
          courseData = {
            ...courseData,
            modules: getKubernetesCourseModules()
          };
        }

        // If this is a GCP course and doesn't have modules, add the GCP curriculum
        if (courseData.title.toLowerCase().includes('gcp') && (!courseData.modules || courseData.modules.length === 0)) {
          courseData = {
            ...courseData,
            modules: getGCPCourseModules()
          };
        }

        // If this is an Ansible course and doesn't have modules, add the Ansible curriculum
        if (courseData.title.toLowerCase().includes('ansible') && (!courseData.modules || courseData.modules.length === 0)) {
          courseData = {
            ...courseData,
            modules: getAnsibleCourseModules()
          };
        }

        // If this is a Jenkins course and doesn't have modules, add the Jenkins curriculum
        if (courseData.title.toLowerCase().includes('jenkins') && (!courseData.modules || courseData.modules.length === 0)) {
          courseData = {
            ...courseData,
            modules: getJenkinsCourseModules()
          };
        }

        setCourse(courseData);

        // Expand first module by default
        if (courseData.modules && courseData.modules.length > 0) {
          setExpandedModules(new Set([courseData.modules[0].id]));
        }
      } catch (error) {
        console.error('Error loading course:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  // Azure course curriculum data
  const getAzureCourseModules = () => [
    {
      id: 1,
      title: "Introduction to Cloud Computing",
      description: "Fundamental concepts of cloud computing and its benefits",
      topics: [
        {
          id: 1,
          title: "Introduction to Cloud Computing",
          description: "Overview of cloud computing concepts and architecture"
        },
        {
          id: 2,
          title: "Cloud - Advantages",
          description: "Benefits and advantages of cloud computing over traditional infrastructure"
        },
        {
          id: 3,
          title: "Cloud services PaaS/SaaS/IaaS and vendors",
          description: "Understanding different cloud service models and major cloud providers"
        }
      ]
    },
    {
      id: 2,
      title: "Azure Fundamentals",
      description: "Core concepts of Microsoft Azure platform",
      topics: [
        {
          id: 4,
          title: "Introduction to Microsoft Azure",
          description: "Overview of Microsoft Azure cloud platform"
        },
        {
          id: 5,
          title: "Microsoft Azure Architecture",
          description: "Understanding Azure's architectural components and structure"
        },
        {
          id: 6,
          title: "Regions and Availability Zones",
          description: "Azure regions, availability zones, and geographic distribution"
        },
        {
          id: 7,
          title: "Availability Set (Fault and Update Domains)",
          description: "High availability concepts and fault/update domains in Azure"
        },
        {
          id: 8,
          title: "Data Center and Multiple data centers",
          description: "Azure data center architecture and redundancy"
        }
      ]
    },
    {
      id: 3,
      title: "Microsoft Azure Account",
      description: "Setting up and managing Azure accounts and subscriptions",
      topics: [
        {
          id: 9,
          title: "Setting up Azure Account",
          description: "Creating and configuring Microsoft Azure account"
        },
        {
          id: 10,
          title: "Tenants and subscription",
          description: "Understanding Azure tenants and subscription management"
        },
        {
          id: 11,
          title: "Billing details",
          description: "Azure billing, cost management, and pricing models"
        }
      ]
    },
    {
      id: 4,
      title: "Azure Virtual Machines",
      description: "Creating, managing, and troubleshooting Azure VMs",
      topics: [
        {
          id: 12,
          title: "Create / Delete the Virtual Machines",
          description: "Step-by-step guide to creating and deleting Azure VMs"
        },
        {
          id: 13,
          title: "Virtual machines options",
          description: "Different VM types, sizes, and configuration options"
        },
        {
          id: 14,
          title: "Introduction to ARM",
          description: "Azure Resource Manager templates and infrastructure as code"
        },
        {
          id: 15,
          title: "Managing Azure VM Resources and Resources group",
          description: "Resource groups, tagging, and resource management"
        },
        {
          id: 16,
          title: "Move Resource From One Resource Group to Another",
          description: "Moving resources between resource groups"
        },
        {
          id: 17,
          title: "Troubleshooting virtual machines (Boot diagnostics, Redeploy etc.)",
          description: "Common VM issues and troubleshooting techniques"
        },
        {
          id: 18,
          title: "Monitoring Virtual machines",
          description: "Azure Monitor for VMs and performance monitoring"
        }
      ]
    },
    {
      id: 5,
      title: "Azure Storage",
      description: "Different types of Azure storage services",
      topics: [
        {
          id: 19,
          title: "Advantages of Azure storage",
          description: "Benefits and use cases of Azure storage solutions"
        },
        {
          id: 20,
          title: "Azure Blob Storage",
          description: "Object storage for unstructured data"
        },
        {
          id: 21,
          title: "Azure File storage",
          description: "File shares and SMB protocol support"
        },
        {
          id: 22,
          title: "Azure Queues and Tables",
          description: "NoSQL storage and message queuing services"
        }
      ]
    },
    {
      id: 6,
      title: "Azure VM Image Builder",
      description: "Creating and managing custom VM images",
      topics: [
        {
          id: 23,
          title: "Explain benefits of AMI",
          description: "Azure Managed Images and their advantages"
        },
        {
          id: 24,
          title: "Manage Azure Compute Gallery",
          description: "Creating and managing image galleries"
        },
        {
          id: 25,
          title: "Manage the Image definition",
          description: "Defining and versioning custom images"
        },
        {
          id: 26,
          title: "Deploy the VMs from Customized Image",
          description: "Deploying VMs using custom images"
        }
      ]
    },
    {
      id: 7,
      title: "Azure Network (VNet)",
      description: "Virtual networking concepts and implementation",
      topics: [
        {
          id: 27,
          title: "Implementing and Managing Virtual Networks",
          description: "Creating and managing Azure Virtual Networks"
        },
        {
          id: 28,
          title: "Planning Virtual Networks",
          description: "VNet design and architecture best practices"
        },
        {
          id: 29,
          title: "Azure VNet Components",
          description: "Subnets, address spaces, and network components"
        },
        {
          id: 30,
          title: "IP Address – Public and Private IPs",
          description: "Public and private IP address management"
        },
        {
          id: 31,
          title: "Azure VNet Subnets",
          description: "Subnet planning and configuration"
        },
        {
          id: 32,
          title: "Azure Network Interface Cards (NIC)",
          description: "Network interfaces and NIC configuration"
        },
        {
          id: 33,
          title: "Explained about VNet-VNet Peering",
          description: "Connecting VNets across regions and subscriptions"
        },
        {
          id: 34,
          title: "Network Security Group (NSG)",
          description: "Network security and traffic filtering"
        },
        {
          id: 35,
          title: "Manage Route Tables",
          description: "Custom routing and route table management"
        },
        {
          id: 36,
          title: "Service Tags",
          description: "Service tags for Azure services"
        },
        {
          id: 37,
          title: "Azure Bastion",
          description: "Secure RDP/SSH access to VMs"
        },
        {
          id: 38,
          title: "Azure Express Route",
          description: "Private connectivity to Azure"
        }
      ]
    },
    {
      id: 8,
      title: "VMSS (Auto Scaling)",
      description: "Virtual Machine Scale Sets and load balancing",
      topics: [
        {
          id: 39,
          title: "Implementing Websites",
          description: "Deploying web applications in Azure"
        },
        {
          id: 40,
          title: "Planning for Website Deployment",
          description: "Architecture planning for web applications"
        },
        {
          id: 41,
          title: "Azure Load balancer configuration",
          description: "Load balancer setup and configuration"
        },
        {
          id: 42,
          title: "Deploying Websites",
          description: "Web app deployment strategies"
        },
        {
          id: 43,
          title: "Configuring Websites",
          description: "Web app configuration and settings"
        },
        {
          id: 44,
          title: "Monitoring Websites",
          description: "Application performance monitoring"
        },
        {
          id: 45,
          title: "Scaling websites",
          description: "Auto-scaling web applications"
        },
        {
          id: 46,
          title: "Troubleshooting websites",
          description: "Common web app issues and solutions"
        }
      ]
    },
    {
      id: 9,
      title: "Backup",
      description: "Azure backup services and strategies",
      topics: [
        {
          id: 47,
          title: "Overview of Azure Backup Services",
          description: "Azure backup solutions and services"
        },
        {
          id: 48,
          title: "Azure VM backup",
          description: "Backing up virtual machines"
        },
        {
          id: 49,
          title: "On premise data backup to Azure",
          description: "Hybrid backup scenarios"
        },
        {
          id: 50,
          title: "Retention policies",
          description: "Backup retention and lifecycle management"
        }
      ]
    },
    {
      id: 10,
      title: "Database Fundamentals",
      description: "Azure database services and implementation",
      topics: [
        {
          id: 51,
          title: "Implementing Azure SQL Database",
          description: "Relational database deployment and management"
        },
        {
          id: 52,
          title: "Implementing NoSQL using Cosmos DB",
          description: "NoSQL database implementation"
        }
      ]
    },
    {
      id: 11,
      title: "Authentication and Authorization in Azure using RBAC",
      description: "Identity and access management",
      topics: [
        {
          id: 53,
          title: "Identity and Access Management in Azure",
          description: "Azure AD and identity services"
        },
        {
          id: 54,
          title: "Role-Based Access Management (RBAC)",
          description: "Role-based access control in Azure"
        },
        {
          id: 55,
          title: "Role Definitions",
          description: "Built-in and custom roles"
        },
        {
          id: 56,
          title: "Role Assignment in Azure Resources",
          description: "Assigning roles to users and groups"
        },
        {
          id: 57,
          title: "Azure Users & Groups",
          description: "User and group management"
        },
        {
          id: 58,
          title: "RBAC Policies",
          description: "Azure policy and governance"
        }
      ]
    },
    {
      id: 12,
      title: "Azure Monitoring",
      description: "Monitoring and observability in Azure",
      topics: [
        {
          id: 59,
          title: "Azure Monitor",
          description: "Centralized monitoring solution"
        },
        {
          id: 60,
          title: "Azure Metrics",
          description: "Performance metrics and KPIs"
        },
        {
          id: 61,
          title: "Log Analytics",
          description: "Log collection and analysis"
        },
        {
          id: 62,
          title: "Alerts and Actions",
          description: "Alerting and automated responses"
        },
        {
          id: 63,
          title: "Application Insights",
          description: "Application performance monitoring"
        },
        {
          id: 64,
          title: "Backup Reports",
          description: "Backup status and reporting"
        }
      ]
    },
    {
      id: 13,
      title: "Migration",
      description: "Migrating workloads to Azure",
      topics: [
        {
          id: 65,
          title: "Overview",
          description: "Migration concepts and strategies"
        },
        {
          id: 66,
          title: "Overview of server Migration to Azure from on premise",
          description: "Server migration planning and execution"
        }
      ]
    }
  ];

  // Terraform course curriculum data
  const getTerraformCourseModules = () => [
    {
      id: 1,
      title: "Introduction to Terraform",
      description: "Fundamental concepts of Infrastructure as Code and Terraform",
      topics: [
        {
          id: 1,
          title: "What is Infrastructure as Code (IaC)?",
          description: "Understanding the concept of managing infrastructure through code"
        },
        {
          id: 2,
          title: "Benefits of Terraform over other IaC tools",
          description: "Advantages of Terraform compared to other infrastructure automation tools"
        },
        {
          id: 3,
          title: "Terraform architecture and workflow",
          description: "How Terraform works internally and its core architecture"
        },
        {
          id: 4,
          title: "Installing Terraform and setting up the environment",
          description: "Installation process and environment configuration"
        }
      ]
    },
    {
      id: 2,
      title: "Core Terraform Concepts",
      description: "Essential Terraform building blocks and syntax",
      topics: [
        {
          id: 5,
          title: "Providers and Resources",
          description: "Understanding providers and declaring infrastructure resources"
        },
        {
          id: 6,
          title: "Variables, Outputs, and Locals",
          description: "Managing configuration values and exposing information"
        },
        {
          id: 7,
          title: "Data Sources and Dependencies",
          description: "Fetching external data and managing resource dependencies"
        },
        {
          id: 8,
          title: "Terraform CLI commands (init, plan, apply, destroy)",
          description: "Core Terraform workflow commands and their usage"
        }
      ]
    },
    {
      id: 3,
      title: "State Management",
      description: "Managing Terraform state and multi-environment deployments",
      topics: [
        {
          id: 9,
          title: "Terraform State file (terraform.tfstate)",
          description: "Understanding the state file and its importance"
        },
        {
          id: 10,
          title: "Remote state storage (S3, Azure Blob, etc.)",
          description: "Storing state remotely for team collaboration"
        },
        {
          id: 11,
          title: "State locking and isolation",
          description: "Preventing concurrent state modifications"
        },
        {
          id: 12,
          title: "Workspaces for multi-environment support",
          description: "Managing multiple environments with workspaces"
        }
      ]
    },
    {
      id: 4,
      title: "Modules and Reusability",
      description: "Creating reusable and maintainable Terraform code",
      topics: [
        {
          id: 13,
          title: "Creating and using modules",
          description: "Building and consuming Terraform modules"
        },
        {
          id: 14,
          title: "Module versioning and registry",
          description: "Version control and publishing modules"
        },
        {
          id: 15,
          title: "Nested modules and composition",
          description: "Complex module hierarchies and composition patterns"
        },
        {
          id: 16,
          title: "Best practices for modular design",
          description: "Design patterns and best practices for modules"
        }
      ]
    },
    {
      id: 5,
      title: "Security and Secrets Management",
      description: "Securing Terraform configurations and sensitive data",
      topics: [
        {
          id: 17,
          title: "Managing sensitive data",
          description: "Handling passwords, API keys, and other secrets"
        },
        {
          id: 18,
          title: "Integrating with Vault and AWS Secrets Manager",
          description: "External secret management systems integration"
        },
        {
          id: 19,
          title: "Role-based access control (RBAC)",
          description: "Access control and permissions in Terraform"
        },
        {
          id: 20,
          title: "Terraform Cloud and Enterprise features",
          description: "Advanced security features in Terraform platforms"
        }
      ]
    },
    {
      id: 6,
      title: "Testing and Validation",
      description: "Ensuring code quality and reliability",
      topics: [
        {
          id: 21,
          title: "terraform validate and terraform fmt",
          description: "Built-in validation and formatting tools"
        },
        {
          id: 22,
          title: "Automated testing with terratest",
          description: "Infrastructure testing framework"
        },
        {
          id: 23,
          title: "Policy enforcement with Sentinel",
          description: "Policy as code for governance"
        },
        {
          id: 24,
          title: "Linting and code quality checks",
          description: "Static analysis and code quality tools"
        }
      ]
    },
    {
      id: 7,
      title: "CI/CD Integration",
      description: "Integrating Terraform into development workflows",
      topics: [
        {
          id: 25,
          title: "Integrating Terraform with GitHub Actions, GitLab CI, Jenkins",
          description: "Popular CI/CD platform integrations"
        },
        {
          id: 26,
          title: "Automated provisioning pipelines",
          description: "Building automated infrastructure pipelines"
        },
        {
          id: 27,
          title: "Version control and collaboration workflows",
          description: "Git-based collaboration patterns"
        }
      ]
    },
    {
      id: 8,
      title: "Cloud Provider Deep Dive",
      description: "Platform-specific implementations and patterns",
      topics: [
        {
          id: 28,
          title: "Azure: Resource Groups, VMs, Storage, Networking",
          description: "Azure-specific resources and patterns"
        },
        {
          id: 29,
          title: "GCP: Projects, Compute Engine, IAM, Cloud Storage",
          description: "Google Cloud Platform resources and patterns"
        }
      ]
    },
    {
      id: 9,
      title: "Monitoring and Logging",
      description: "Observability and troubleshooting",
      topics: [
        {
          id: 30,
          title: "Terraform logging and debug flags",
          description: "Debugging and logging configuration"
        },
        {
          id: 31,
          title: "Integration with monitoring tools (Datadog, Prometheus)",
          description: "External monitoring system integration"
        },
        {
          id: 32,
          title: "Audit trails and change tracking",
          description: "Tracking infrastructure changes"
        }
      ]
    },
    {
      id: 10,
      title: "Real-World Projects",
      description: "Practical implementation scenarios",
      topics: [
        {
          id: 33,
          title: "Multi-tier application deployment",
          description: "Complex application infrastructure deployment"
        },
        {
          id: 34,
          title: "Hybrid cloud infrastructure",
          description: "Multi-cloud and hybrid cloud architectures"
        },
        {
          id: 35,
          title: "Disaster recovery and high availability setups",
          description: "Building resilient infrastructure"
        }
      ]
    },
    {
      id: 11,
      title: "Certification & Interview Prep",
      description: "Career development and certification preparation",
      topics: [
        {
          id: 36,
          title: "Practice questions and mock tests",
          description: "Exam preparation materials"
        },
        {
          id: 37,
          title: "Resume and portfolio building",
          description: "Professional development guidance"
        }
      ]
    }
  ];

  // Docker course curriculum data
  const getDockerCourseModules = () => [
    {
      id: 1,
      title: "Introduction to Docker",
      description: "Fundamental concepts of containerization and Docker",
      topics: [
        {
          id: 1,
          title: "What is containerization?",
          description: "Understanding container technology and its advantages"
        },
        {
          id: 2,
          title: "Benefits of Docker over traditional virtualization",
          description: "Comparing containers vs virtual machines"
        },
        {
          id: 3,
          title: "Installing Docker on Windows/Linux/Mac",
          description: "Platform-specific installation guides"
        },
        {
          id: 4,
          title: "Docker CLI and Docker Desktop overview",
          description: "Introduction to Docker tools and interfaces"
        }
      ]
    },
    {
      id: 2,
      title: "Docker Architecture & Components",
      description: "Core Docker architecture and building blocks",
      topics: [
        {
          id: 5,
          title: "Docker Engine, Daemon, and Client",
          description: "Understanding Docker's core components"
        },
        {
          id: 6,
          title: "Images, Containers, Volumes, and Networks",
          description: "Docker's fundamental building blocks"
        },
        {
          id: 7,
          title: "Registries: Docker Hub, private registries",
          description: "Image storage and distribution systems"
        }
      ]
    },
    {
      id: 3,
      title: "Working with Containers",
      description: "Managing container lifecycle and operations",
      topics: [
        {
          id: 8,
          title: "Pulling and running containers",
          description: "Basic container operations"
        },
        {
          id: 9,
          title: "Managing container lifecycle: start, stop, restart, remove",
          description: "Container state management"
        },
        {
          id: 10,
          title: "Executing commands inside containers",
          description: "Interacting with running containers"
        },
        {
          id: 11,
          title: "Port mapping and environment variables",
          description: "Container networking and configuration"
        }
      ]
    },
    {
      id: 4,
      title: "Docker Images & Dockerfile",
      description: "Building and managing custom Docker images",
      topics: [
        {
          id: 12,
          title: "Writing Dockerfiles",
          description: "Creating container blueprints"
        },
        {
          id: 13,
          title: "Building custom images",
          description: "Image creation process"
        },
        {
          id: 14,
          title: "Multi-stage builds",
          description: "Optimizing image size and build process"
        },
        {
          id: 15,
          title: "Image tagging and versioning",
          description: "Image naming and version control"
        }
      ]
    },
    {
      id: 5,
      title: "Docker Networking",
      description: "Container networking and communication",
      topics: [
        {
          id: 16,
          title: "Bridge, Host, and Overlay networks",
          description: "Docker network types and use cases"
        },
        {
          id: 17,
          title: "Container communication",
          description: "Inter-container communication patterns"
        },
        {
          id: 18,
          title: "Exposing ports and linking containers",
          description: "Network configuration and service discovery"
        },
        {
          id: 19,
          title: "Network troubleshooting",
          description: "Debugging network connectivity issues"
        }
      ]
    },
    {
      id: 6,
      title: "Docker Compose",
      description: "Multi-container application management",
      topics: [
        {
          id: 20,
          title: "YAML syntax and structure",
          description: "Understanding docker-compose.yml format"
        },
        {
          id: 21,
          title: "Defining multi-container applications",
          description: "Orchestrating complex applications"
        },
        {
          id: 22,
          title: "Environment variables and volumes in Compose",
          description: "Configuration and data management"
        },
        {
          id: 23,
          title: "Compose lifecycle commands",
          description: "Managing compose applications"
        }
      ]
    },
    {
      id: 7,
      title: "Docker Volumes & Storage",
      description: "Persistent data management in containers",
      topics: [
        {
          id: 24,
          title: "Bind mounts vs named volumes",
          description: "Different storage mounting strategies"
        },
        {
          id: 25,
          title: "Volume lifecycle and management",
          description: "Creating, managing, and cleaning volumes"
        },
        {
          id: 26,
          title: "Persistent data strategies",
          description: "Ensuring data persistence across container restarts"
        }
      ]
    },
    {
      id: 8,
      title: "Docker Security & Best Practices",
      description: "Securing containerized applications",
      topics: [
        {
          id: 27,
          title: "User namespaces and container isolation",
          description: "Security isolation and privilege management"
        },
        {
          id: 28,
          title: "Securing Dockerfiles and images",
          description: "Writing secure container definitions"
        },
        {
          id: 29,
          title: "Vulnerability scanning with Docker Scout",
          description: "Image security assessment"
        },
        {
          id: 30,
          title: "Secrets management with Vault",
          description: "Managing sensitive configuration data"
        }
      ]
    },
    {
      id: 9,
      title: "Docker Orchestration & Swarm",
      description: "Container orchestration with Docker Swarm",
      topics: [
        {
          id: 31,
          title: "Docker Swarm architecture",
          description: "Understanding swarm mode components"
        },
        {
          id: 32,
          title: "Creating and managing services",
          description: "Service definition and management"
        },
        {
          id: 33,
          title: "Scaling and rolling updates",
          description: "Application scaling and zero-downtime updates"
        },
        {
          id: 34,
          title: "Load balancing and fault tolerance",
          description: "High availability and load distribution"
        }
      ]
    },
    {
      id: 10,
      title: "Introduction to Kubernetes (Optional)",
      description: "Container orchestration with Kubernetes",
      topics: [
        {
          id: 35,
          title: "Kubernetes vs Docker Swarm",
          description: "Comparing orchestration platforms"
        },
        {
          id: 36,
          title: "Pods, Deployments, Services",
          description: "Core Kubernetes concepts"
        },
        {
          id: 37,
          title: "Helm charts and container orchestration",
          description: "Package management and deployment"
        }
      ]
    },
    {
      id: 11,
      title: "CI/CD with Docker",
      description: "Integrating Docker into development workflows",
      topics: [
        {
          id: 38,
          title: "Integrating Docker with Jenkins, GitHub Actions",
          description: "CI/CD pipeline integration"
        },
        {
          id: 39,
          title: "Building pipelines for containerized apps",
          description: "Automated build and deployment"
        },
        {
          id: 40,
          title: "Automated testing and deployment",
          description: "Testing and deployment automation"
        }
      ]
    },
    {
      id: 12,
      title: "Hands-on Projects",
      description: "Practical implementation and troubleshooting",
      topics: [
        {
          id: 41,
          title: "Real-world containerized app deployment",
          description: "End-to-end application deployment"
        },
        {
          id: 42,
          title: "Troubleshooting and debugging labs",
          description: "Common issues and debugging techniques"
        }
      ]
    }
  ];

  // Git course curriculum data
  const getGitCourseModules = () => [
    {
      id: 1,
      title: "Git Fundamentals",
      description: "Core concepts of version control and Git",
      topics: [
        {
          id: 1,
          title: "What is version control?",
          description: "Understanding version control systems and their importance"
        },
        {
          id: 2,
          title: "Centralized vs distributed version control",
          description: "Comparing different version control architectures"
        },
        {
          id: 3,
          title: "Installing Git and initial setup",
          description: "Installation and basic configuration"
        },
        {
          id: 4,
          title: "Git architecture overview",
          description: "Understanding Git's internal structure"
        }
      ]
    },
    {
      id: 2,
      title: "Git Basics",
      description: "Essential Git commands and operations",
      topics: [
        {
          id: 5,
          title: "git init, git add, git commit",
          description: "Basic Git workflow commands"
        },
        {
          id: 6,
          title: "Git staging area and commit internals",
          description: "Understanding staging and commit structure"
        },
        {
          id: 7,
          title: "Exploring Git objects and storage",
          description: "Git's object model and storage mechanism"
        },
        {
          id: 8,
          title: "Visualizing commit history",
          description: "Viewing and understanding commit trees"
        }
      ]
    },
    {
      id: 3,
      title: "Branching & Merging",
      description: "Working with branches and merging strategies",
      topics: [
        {
          id: 9,
          title: "Creating and switching branches",
          description: "Branch creation and navigation"
        },
        {
          id: 10,
          title: "Understanding HEAD and refs",
          description: "Git references and pointer management"
        },
        {
          id: 11,
          title: "Merging strategies and conflict resolution",
          description: "Different merge approaches and handling conflicts"
        },
        {
          id: 12,
          title: "Git rebase vs merge",
          description: "Comparing rebasing and merging strategies"
        },
        {
          id: 13,
          title: "Resetting and reverting changes",
          description: "Undoing changes safely"
        }
      ]
    },
    {
      id: 4,
      title: "Advanced Git Features",
      description: "Advanced Git functionality and productivity tools",
      topics: [
        {
          id: 14,
          title: "Git tags and annotations",
          description: "Creating and managing release tags"
        },
        {
          id: 15,
          title: "Git hooks for automation",
          description: "Automating workflows with Git hooks"
        },
        {
          id: 16,
          title: "Git aliases for productivity",
          description: "Creating shortcuts for common commands"
        },
        {
          id: 17,
          title: "Cherry-pick and stash operations",
          description: "Selective commit application and temporary storage"
        }
      ]
    },
    {
      id: 5,
      title: "Remote Repositories",
      description: "Working with remote repositories and platforms",
      topics: [
        {
          id: 18,
          title: "Cloning and forking repositories",
          description: "Creating local copies of remote repositories"
        },
        {
          id: 19,
          title: "git fetch, git pull, git push",
          description: "Synchronizing with remote repositories"
        },
        {
          id: 20,
          title: "Working with GitHub, GitLab, Bitbucket",
          description: "Popular Git hosting platforms"
        },
        {
          id: 21,
          title: "SSH keys and authentication",
          description: "Secure authentication methods"
        }
      ]
    },
    {
      id: 6,
      title: "Git Internals & Troubleshooting",
      description: "Deep dive into Git internals and debugging",
      topics: [
        {
          id: 22,
          title: "Git object model: blobs, trees, commits",
          description: "Understanding Git's data structures"
        },
        {
          id: 23,
          title: "Debugging with git",
          description: "Tools and techniques for troubleshooting"
        },
        {
          id: 24,
          title: "Performance tuning and optimization",
          description: "Improving Git performance"
        }
      ]
    },
    {
      id: 7,
      title: "Hands-On Projects",
      description: "Practical implementation and team workflows",
      topics: [
        {
          id: 25,
          title: "Real-world Git workflows",
          description: "Industry-standard Git workflows"
        },
        {
          id: 26,
          title: "Team collaboration scenarios",
          description: "Collaborative development patterns"
        },
        {
          id: 27,
          title: "Conflict resolution labs",
          description: "Practical conflict resolution exercises"
        },
        {
          id: 28,
          title: "CI/CD integration with Git",
          description: "Integrating Git with CI/CD pipelines"
        }
      ]
    },
    {
      id: 8,
      title: "Interview Prep",
      description: "Career development and interview preparation",
      topics: [
        {
          id: 29,
          title: "Git interview questions",
          description: "Common interview questions and answers"
        }
      ]
    }
  ];

  // Kubernetes course curriculum data
  const getKubernetesCourseModules = () => [
    {
      id: 1,
      title: "Getting Started with Kubernetes",
      description: "Introduction to Kubernetes and container orchestration",
      topics: [
        {
          id: 1,
          title: "Why Kubernetes?: History, evolution, and need",
          description: "Understanding the need for container orchestration and Kubernetes' role"
        },
        {
          id: 2,
          title: "Microservices Architecture: Role of Kubernetes in modern app deployment",
          description: "How Kubernetes enables microservices deployment and management"
        },
        {
          id: 3,
          title: "Kubernetes Architecture: Cluster components, control plane, node roles",
          description: "Understanding Kubernetes cluster architecture and components"
        }
      ]
    },
    {
      id: 2,
      title: "Core Concepts",
      description: "Essential Kubernetes objects and configuration",
      topics: [
        {
          id: 4,
          title: "Kubernetes Objects: Pods, ReplicaSets, Deployments, Services",
          description: "Core Kubernetes resources and their relationships"
        },
        {
          id: 5,
          title: "Configuration Management: Labels, selectors, environment variables",
          description: "Managing configuration and metadata in Kubernetes"
        },
        {
          id: 6,
          title: "YAML & kubectl: Declarative vs imperative, CLI usage",
          description: "Writing manifests and using kubectl commands"
        }
      ]
    },
    {
      id: 3,
      title: "Observability & Maintenance",
      description: "Monitoring, logging, and health management",
      topics: [
        {
          id: 7,
          title: "Health Checks: Readiness and liveness probes",
          description: "Configuring health checks for applications"
        },
        {
          id: 8,
          title: "Monitoring & Logging: Tools and techniques",
          description: "Observability tools and logging strategies"
        },
        {
          id: 9,
          title: "Scheduling & Resource Limits: Pod placement, quotas",
          description: "Resource management and scheduling policies"
        }
      ]
    },
    {
      id: 4,
      title: "Application Lifecycle Management",
      description: "Deployment strategies and scaling",
      topics: [
        {
          id: 10,
          title: "Deployments & Rollbacks: Strategies for updates",
          description: "Rolling updates, rollbacks, and deployment strategies"
        },
        {
          id: 11,
          title: "Scaling Applications: Horizontal pod autoscaling",
          description: "Automatic scaling based on resource usage"
        },
        {
          id: 12,
          title: "Self-Healing Mechanisms: ReplicaSets, probes",
          description: "Automatic recovery and fault tolerance"
        }
      ]
    },
    {
      id: 5,
      title: "Storage & Persistence",
      description: "Persistent storage and data management",
      topics: [
        {
          id: 13,
          title: "Volumes & Claims: PV, PVC, StorageClass",
          description: "Persistent volume management and storage classes"
        },
        {
          id: 14,
          title: "Access Modes & Reclaim Policies",
          description: "Storage access modes and lifecycle management"
        },
        {
          id: 15,
          title: "Persistent Storage Configuration",
          description: "Configuring persistent storage for applications"
        }
      ]
    },
    {
      id: 6,
      title: "Networking & Services",
      description: "Kubernetes networking and service discovery",
      topics: [
        {
          id: 16,
          title: "Pod & Service Networking: Cluster IP, NodePort, LoadBalancer",
          description: "Service types and networking models"
        },
        {
          id: 17,
          title: "Ingress Controllers & Rules",
          description: "Managing external traffic with Ingress"
        },
        {
          id: 18,
          title: "Network Policies & Security",
          description: "Network security and traffic control"
        }
      ]
    },
    {
      id: 7,
      title: "Advanced Topics",
      description: "Advanced Kubernetes features and integrations",
      topics: [
        {
          id: 19,
          title: "RBAC & OIDC: Authentication and authorization",
          description: "Role-based access control and identity management"
        },
        {
          id: 20,
          title: "GitOps & CI/CD: Git actions and harness",
          description: "GitOps practices and CI/CD integration"
        }
      ]
    },
    {
      id: 8,
      title: "Hands-On Labs",
      description: "Practical implementation and troubleshooting",
      topics: [
        {
          id: 21,
          title: "Real-world scenarios: break-fix tasks",
          description: "Practical troubleshooting and problem-solving exercises"
        }
      ]
    }
  ];

  // GCP course curriculum data
  const getGCPCourseModules = () => [
    {
      id: 1,
      title: "Introduction to Google Cloud",
      description: "Fundamentals of Google Cloud Platform and cloud computing",
      topics: [
        {
          id: 1,
          title: "Understand what cloud computing is (vs traditional IT)",
          description: "Comparing cloud computing with traditional IT infrastructure"
        },
        {
          id: 2,
          title: "Why GCP is a strong choice & where it fits vs AWS/Azure",
          description: "GCP's competitive advantages and use cases"
        },
        {
          id: 3,
          title: "Successfully create a GCP free account",
          description: "Setting up a GCP account and accessing free tier"
        },
        {
          id: 4,
          title: "Explore Cloud Console & Cloud Shell",
          description: "Navigating GCP's web interface and command-line tools"
        },
        {
          id: 5,
          title: "Get comfortable with the basic GCP vocabulary",
          description: "Understanding GCP terminology and concepts"
        },
        {
          id: 6,
          title: "Google Cloud Resource Hierarchy",
          description: "Organization, folders, projects, and resources structure"
        }
      ]
    },
    {
      id: 2,
      title: "Compute in the Cloud",
      description: "Virtual machines and compute resources in GCP",
      topics: [
        {
          id: 7,
          title: "Google Compute Engine (VMs)",
          description: "Creating and managing virtual machines"
        },
        {
          id: 8,
          title: "Cloud Marketplace solutions",
          description: "Pre-configured solutions and software packages"
        },
        {
          id: 9,
          title: "Pricing Models: sustained-use, committed-use, preemptible & spot VMs",
          description: "Different pricing options for compute resources"
        },
        {
          id: 10,
          title: "Machine Types & Storage: disks, SSDs, Filestore",
          description: "VM configurations and storage options"
        },
        {
          id: 11,
          title: "Autoscaling & Machine Families",
          description: "Automatic scaling and machine type families"
        },
        {
          id: 12,
          title: "Custom Images, Instance templates",
          description: "Creating custom VM images and templates"
        }
      ]
    },
    {
      id: 3,
      title: "Object Storage",
      description: "Cloud Storage for unstructured data",
      topics: [
        {
          id: 13,
          title: "Cloud Storage overview (unstructured data)",
          description: "Understanding Google Cloud Storage service"
        },
        {
          id: 14,
          title: "Storage Classes: Standard, Nearline, Coldline, Archive",
          description: "Different storage tiers for cost optimization"
        },
        {
          id: 15,
          title: "Key Features: buckets, versioning, lifecycle mgmt, encryption",
          description: "Storage features and data management"
        }
      ]
    },
    {
      id: 4,
      title: "Resources & Access in the Cloud",
      description: "Identity and access management in GCP",
      topics: [
        {
          id: 16,
          title: "Identity & Access Management (IAM): policies, roles, inheritance",
          description: "GCP's access control system"
        },
        {
          id: 17,
          title: "IAM Roles: Basic, Predefined, Custom",
          description: "Different types of IAM roles and permissions"
        },
        {
          id: 18,
          title: "Service Accounts: secure automated access",
          description: "Automated access for applications and services"
        },
        {
          id: 19,
          title: "Cloud Identity: user & group management",
          description: "Managing users and groups in GCP"
        },
        {
          id: 20,
          title: "Interacting with GCP: Console, SDK, APIs, Mobile App",
          description: "Different ways to interact with GCP services"
        }
      ]
    },
    {
      id: 5,
      title: "Networking in the Cloud",
      description: "Network infrastructure and services",
      topics: [
        {
          id: 21,
          title: "VPC: subnets, routing, firewall rules",
          description: "Virtual Private Cloud networking"
        },
        {
          id: 22,
          title: "VPC Peering & Shared VPC",
          description: "Connecting and sharing VPC networks"
        },
        {
          id: 23,
          title: "Cloud Load Balancing (HTTP(S), TCP/UDP, failover)",
          description: "Load balancing solutions for applications"
        },
        {
          id: 24,
          title: "Cloud DNS & Cloud CDN",
          description: "DNS services and content delivery network"
        }
      ]
    },
    {
      id: 6,
      title: "Database Storage",
      description: "Managed database services",
      topics: [
        {
          id: 25,
          title: "Cloud SQL: managed relational DBs",
          description: "Fully managed relational database service"
        }
      ]
    },
    {
      id: 7,
      title: "Containers in the Cloud",
      description: "Container orchestration with Kubernetes",
      topics: [
        {
          id: 26,
          title: "Introduction to Containers: benefits & use cases",
          description: "Container technology and applications"
        },
        {
          id: 27,
          title: "Kubernetes Basics: clusters, pods, deployments",
          description: "Fundamental Kubernetes concepts"
        },
        {
          id: 28,
          title: "Google Kubernetes Engine (GKE): Autopilot & Standard modes",
          description: "Managed Kubernetes service options"
        },
        {
          id: 29,
          title: "kubectl Operations: deployment, scaling, updates, YAML configs",
          description: "Kubernetes command-line operations"
        }
      ]
    },
    {
      id: 8,
      title: "Applications in the Cloud",
      description: "Serverless computing options",
      topics: [
        {
          id: 30,
          title: "Cloud Run: serverless containers, scaling, flexible runtimes",
          description: "Serverless container platform"
        },
        {
          id: 31,
          title: "Cloud Run Functions: lightweight, event-driven compute",
          description: "Serverless function execution"
        },
        {
          id: 32,
          title: "Use Cases & Comparisons between Cloud Run & Functions",
          description: "When to use each serverless option"
        }
      ]
    },
    {
      id: 9,
      title: "Cloud Services Integration",
      description: "Supporting services and integrations",
      topics: [
        {
          id: 33,
          title: "Secret Manager (secure keys & credentials)",
          description: "Managing secrets and sensitive data"
        },
        {
          id: 34,
          title: "Pub/Sub (messaging for event-driven apps)",
          description: "Asynchronous messaging service"
        },
        {
          id: 35,
          title: "Cloud Scheduler (cron jobs, periodic tasks)",
          description: "Scheduled job execution"
        },
        {
          id: 36,
          title: "Cloud Logging & Monitoring APIs: observability & alerting",
          description: "Observability and monitoring solutions"
        }
      ]
    }
  ];

  // Ansible course curriculum data
  const getAnsibleCourseModules = () => [
    {
      id: 1,
      title: "Introduction to Ansible",
      description: "Fundamentals of Ansible automation tool",
      topics: [
        {
          id: 1,
          title: "What is Ansible and why use it?",
          description: "Understanding Ansible's purpose and benefits"
        },
        {
          id: 2,
          title: "Agentless architecture and YAML syntax",
          description: "How Ansible works without agents and uses YAML"
        },
        {
          id: 3,
          title: "Installing Ansible and setting up lab environments",
          description: "Installation and environment setup"
        },
        {
          id: 4,
          title: "SSH connectivity and inventory basics",
          description: "Connecting to managed nodes and basic inventory"
        }
      ]
    },
    {
      id: 2,
      title: "Configuration & Inventories",
      description: "Managing Ansible inventories and configurations",
      topics: [
        {
          id: 5,
          title: "Static vs dynamic inventories",
          description: "Different inventory management approaches"
        },
        {
          id: 6,
          title: "Grouping hosts and host variables",
          description: "Organizing managed nodes and variables"
        },
        {
          id: 7,
          title: "Inventory plugins and patterns",
          description: "Extending inventory with plugins"
        },
        {
          id: 8,
          title: "Using Ansible facts for automation",
          description: "Gathering system information automatically"
        }
      ]
    },
    {
      id: 3,
      title: "Playbooks & Modules",
      description: "Writing and executing Ansible playbooks",
      topics: [
        {
          id: 9,
          title: "Writing your first playbook",
          description: "Creating basic Ansible playbooks"
        },
        {
          id: 10,
          title: "Playbook structure: tasks, handlers, roles",
          description: "Understanding playbook components"
        },
        {
          id: 11,
          title: "Common modules: copy, file, yum, apt, service, command",
          description: "Essential Ansible modules for system management"
        },
        {
          id: 12,
          title: "Advanced modules: block, async, delegate_to",
          description: "Advanced module usage patterns"
        }
      ]
    },
    {
      id: 4,
      title: "Roles, Includes & Tags",
      description: "Organizing and structuring Ansible code",
      topics: [
        {
          id: 13,
          title: "Creating reusable roles",
          description: "Building modular Ansible roles"
        },
        {
          id: 14,
          title: "Role directory structure",
          description: "Standard role organization"
        },
        {
          id: 15,
          title: "Includes and imports",
          description: "Code reuse patterns"
        },
        {
          id: 16,
          title: "Using tags for selective execution",
          description: "Selective playbook execution"
        }
      ]
    },
    {
      id: 5,
      title: "Secrets & Security",
      description: "Managing sensitive data and security",
      topics: [
        {
          id: 17,
          title: "Ansible Vault: encrypting files and variables",
          description: "Securing sensitive configuration data"
        },
        {
          id: 18,
          title: "Best practices for secret management",
          description: "Security best practices"
        },
        {
          id: 19,
          title: "Role-based access control (RBAC)",
          description: "Access control and permissions"
        }
      ]
    },
    {
      id: 6,
      title: "Testing & Troubleshooting",
      description: "Validating and debugging Ansible code",
      topics: [
        {
          id: 20,
          title: "Validating playbooks with ansible-lint and ansible-playbook --check",
          description: "Playbook validation and dry-run testing"
        },
        {
          id: 21,
          title: "Debugging with register, when, and assert",
          description: "Debugging techniques and conditional execution"
        },
        {
          id: 22,
          title: "Troubleshooting connectivity and module errors",
          description: "Common issues and solutions"
        }
      ]
    },
    {
      id: 7,
      title: "Ansible with DevOps Tools",
      description: "Integrating Ansible with modern DevOps workflows",
      topics: [
        {
          id: 23,
          title: "Docker and container orchestration",
          description: "Container automation with Ansible"
        },
        {
          id: 24,
          title: "Cloud integrations: AWS, Azure, GCP",
          description: "Multi-cloud automation"
        },
        {
          id: 25,
          title: "CI/CD pipelines with Jenkins and GitHub Actions",
          description: "Continuous integration and deployment"
        }
      ]
    },
    {
      id: 8,
      title: "Advanced Automation Techniques",
      description: "Advanced Ansible features and patterns",
      topics: [
        {
          id: 26,
          title: "Parallel execution and looping",
          description: "Efficient execution patterns"
        },
        {
          id: 27,
          title: "Conditional tasks and error handling",
          description: "Conditional execution and error management"
        },
        {
          id: 28,
          title: "Magic variables and Jinja2 templating",
          description: "Dynamic content and templating"
        },
        {
          id: 29,
          title: "Custom modules and plugins",
          description: "Extending Ansible functionality"
        }
      ]
    },
    {
      id: 9,
      title: "Enterprise Automation",
      description: "Enterprise-grade Ansible deployment",
      topics: [
        {
          id: 30,
          title: "Automation Controller and Automation Hub",
          description: "Enterprise Ansible platforms"
        },
        {
          id: 31,
          title: "Workflow orchestration and job templates",
          description: "Complex automation workflows"
        },
        {
          id: 32,
          title: "Scaling Ansible in large environments",
          description: "Enterprise-scale deployment strategies"
        }
      ]
    },
    {
      id: 10,
      title: "Certification & Projects",
      description: "Career development and practical application",
      topics: [
        {
          id: 33,
          title: "Real-world automation scenarios",
          description: "Practical automation projects"
        },
        {
          id: 34,
          title: "Resume and interview prep",
          description: "Career development guidance"
        }
      ]
    }
  ];

  // Jenkins course curriculum data
  const getJenkinsCourseModules = () => [
    {
      id: 1,
      title: "Introduction to Jenkins & CI/CD",
      description: "Fundamentals of Jenkins and continuous integration/delivery",
      topics: [
        {
          id: 1,
          title: "What is Jenkins?",
          description: "Understanding Jenkins and its role in DevOps"
        },
        {
          id: 2,
          title: "Jenkins architecture and components",
          description: "Core components and architecture overview"
        },
        {
          id: 3,
          title: "Continuous Integration vs Continuous Delivery vs Deployment",
          description: "Understanding different CI/CD concepts"
        },
        {
          id: 4,
          title: "Installing and configuring Jenkins",
          description: "Installation and initial setup"
        },
        {
          id: 5,
          title: "Setting up plugins and global configurations",
          description: "Plugin management and system configuration"
        }
      ]
    },
    {
      id: 2,
      title: "Jenkins Pipelines",
      description: "Pipeline creation and management",
      topics: [
        {
          id: 6,
          title: "Declarative vs Scripted pipelines",
          description: "Different pipeline syntax approaches"
        },
        {
          id: 7,
          title: "Creating and running pipelines",
          description: "Building and executing Jenkins pipelines"
        },
        {
          id: 8,
          title: "Groovy scripting basics",
          description: "Programming pipelines with Groovy"
        },
        {
          id: 9,
          title: "Parallel and sequential stages",
          description: "Managing pipeline execution flow"
        },
        {
          id: 10,
          title: "Error handling and conditional execution",
          description: "Handling failures and conditions in pipelines"
        }
      ]
    },
    {
      id: 3,
      title: "Build & Test Automation",
      description: "Automated building and testing",
      topics: [
        {
          id: 11,
          title: "Integrating Jenkins with Git, GitHub, and Bitbucket",
          description: "Version control system integration"
        },
        {
          id: 12,
          title: "Maven and Gradle integration",
          description: "Build tool integration"
        },
        {
          id: 13,
          title: "Running unit tests and capturing results",
          description: "Test execution and result collection"
        },
        {
          id: 14,
          title: "Code coverage and quality tools (SonarQube)",
          description: "Code quality analysis and reporting"
        }
      ]
    },
    {
      id: 4,
      title: "Jenkins with DevOps Tools",
      description: "Integration with DevOps ecosystem",
      topics: [
        {
          id: 15,
          title: "Docker integration for containerized builds",
          description: "Container-based build environments"
        },
        {
          id: 16,
          title: "Ansible for configuration management",
          description: "Infrastructure automation integration"
        },
        {
          id: 17,
          title: "Nexus and Artifactory for artifact storage",
          description: "Binary repository management"
        },
        {
          id: 18,
          title: "Remote testing and deployment automation",
          description: "Distributed testing and deployment"
        }
      ]
    },
    {
      id: 5,
      title: "Security & Access Control",
      description: "Security and access management",
      topics: [
        {
          id: 19,
          title: "User management and authentication",
          description: "Managing Jenkins users and authentication"
        },
        {
          id: 20,
          title: "Role-Based Access Control (RBAC)",
          description: "Permission and access control"
        },
        {
          id: 21,
          title: "Secrets management in pipelines",
          description: "Handling sensitive data securely"
        }
      ]
    },
    {
      id: 6,
      title: "Plugins & Extensions",
      description: "Extending Jenkins functionality",
      topics: [
        {
          id: 22,
          title: "Popular plugins: Blue Ocean, Job DSL, Pipeline plugins",
          description: "Essential Jenkins plugins"
        },
        {
          id: 23,
          title: "Custom plugin development",
          description: "Creating custom Jenkins plugins"
        },
        {
          id: 24,
          title: "Using REST API for automation",
          description: "API-based Jenkins automation"
        },
        {
          id: 25,
          title: "Shared libraries and reusable pipeline code",
          description: "Creating reusable pipeline components"
        }
      ]
    },
    {
      id: 7,
      title: "Distributed Builds & Scalability",
      description: "Scaling Jenkins for enterprise use",
      topics: [
        {
          id: 26,
          title: "Master-agent architecture",
          description: "Distributed build architecture"
        },
        {
          id: 27,
          title: "Configuring Jenkins agents",
          description: "Setting up build agents"
        },
        {
          id: 28,
          title: "Scaling Jenkins for enterprise use",
          description: "Enterprise-scale deployment strategies"
        }
      ]
    },
    {
      id: 8,
      title: "Monitoring & Reporting",
      description: "Monitoring and observability",
      topics: [
        {
          id: 29,
          title: "Build history and trend analysis",
          description: "Build tracking and analytics"
        },
        {
          id: 30,
          title: "Notifications and alerts",
          description: "Alerting and notification systems"
        },
        {
          id: 31,
          title: "Integration with Slack, email, and dashboards",
          description: "Communication and visualization tools"
        }
      ]
    },
    {
      id: 9,
      title: "Real-Time Projects & Hands-On Labs",
      description: "Practical implementation and projects",
      topics: [
        {
          id: 32,
          title: "CI/CD pipeline for a Java or Python project",
          description: "End-to-end pipeline implementation"
        },
        {
          id: 33,
          title: "Dockerized microservices deployment",
          description: "Container-based deployment projects"
        },
        {
          id: 34,
          title: "Jenkins in production environments",
          description: "Production-ready Jenkins deployment"
        }
      ]
    },
    {
      id: 10,
      title: "Interview Prep",
      description: "Career development and interview preparation",
      topics: [
        {
          id: 35,
          title: "Jenkins interview questions",
          description: "Common interview questions and answers"
        },
        {
          id: 36,
          title: "Mock assessments",
          description: "Practice tests and assessments"
        }
      ]
    }
  ];

  const toggleModule = (moduleId) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-border rounded w-1/4 mb-4"></div>
            <div className="h-12 bg-border rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-20 bg-border rounded"></div>
                ))}
              </div>
              <div className="h-64 bg-border rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Course not found</h2>
          <Link to="/courses" className="text-primary-300 hover:text-primary-hover">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex space-x-2 text-sm text-text-muted mb-8">
          <Link to="/" className="hover:text-text-primary">Home</Link>
          <span>/</span>
          <Link to="/courses" className="hover:text-text-primary">Courses</Link>
          <span>/</span>
          <span className="text-text-primary">{course.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="bg-surface-elevated rounded-2xl p-8 border border-border mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-code text-text-secondary px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </span>
                <span className={`${
                  course.level === 'Beginner' ? 'bg-success' :
                  course.level === 'Intermediate' ? 'bg-warning' : 'bg-error'
                } text-surface px-3 py-1 rounded-full text-sm font-medium`}>
                  {course.level}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-text-primary mb-4">
                {course.title}
              </h1>
              
              <p className="text-text-secondary text-lg mb-6">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-6 text-text-secondary mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Mode: {course.mode}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-primary-300 text-surface px-8 py-4 rounded-2xl font-semibold hover:bg-primary-hover transition-colors text-center"
                >
                  Enroll Now
                </Link>
                <button className="border border-border text-text-primary px-8 py-4 rounded-2xl font-semibold hover:bg-surface-hover transition-colors flex items-center justify-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Download Syllabus (PDF)</span>
                </button>
              </div>
            </div>

            {/* Curriculum */}
            {course.modules && course.modules.length > 0 && (
              <div className="bg-surface-elevated rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-bold text-text-primary mb-6">Curriculum</h2>
                
                <div className="space-y-4">
                  {course.modules.map((module) => (
                    <div key={module.id} className="border border-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full p-6 text-left bg-surface-hover hover:bg-border transition-colors flex justify-between items-center"
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-text-primary mb-2">
                            {module.title}
                          </h3>
                          {module.description && (
                            <p className="text-text-secondary text-sm">
                              {module.description}
                            </p>
                          )}
                        </div>
                        {expandedModules.has(module.id) ? (
                          <ChevronUp className="h-5 w-5 text-text-muted" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-text-muted" />
                        )}
                      </button>
                      
                      {expandedModules.has(module.id) && module.topics && module.topics.length > 0 && (
                        <div className="p-6 bg-surface border-t border-border">
                          <div className="space-y-3">
                            {module.topics.map((topic) => (
                              <div key={topic.id} className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-primary-300 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h4 className="text-text-primary font-medium">
                                    {topic.title}
                                  </h4>
                                  {topic.description && (
                                    <p className="text-text-secondary text-sm mt-1">
                                      {topic.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Labs & Projects */}
            {course.labs && course.labs.length > 0 && (
              <div className="bg-surface-elevated rounded-2xl p-8 border border-border mt-8">
                <h2 className="text-2xl font-bold text-text-primary mb-6">Labs & Projects</h2>
                <div className="space-y-4">
                  {course.labs.map((lab) => (
                    <div key={lab.id} className="border border-border rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-text-primary mb-2">
                        {lab.title}
                      </h3>
                      <p className="text-text-secondary mb-3">{lab.description}</p>
                      {lab.objectives && (
                        <div className="text-text-secondary text-sm">
                          <strong>Objectives:</strong> {lab.objectives}
                        </div>
                      )}
                      {lab.duration_minutes && (
                        <div className="text-text-muted text-sm mt-2">
                          Duration: {Math.floor(lab.duration_minutes / 60)}h {lab.duration_minutes % 60}m
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REMOVED: FAQ Link Section */}
            {/* This section has been removed as requested */}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <div className="bg-surface-elevated rounded-2xl p-6 border border-border sticky top-8">
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                Ready to Start?
              </h3>
              <Link
                to="/contact"
                className="w-full bg-primary-300 text-surface py-4 rounded-xl font-semibold hover:bg-primary-hover transition-colors text-center block mb-4"
              >
                Enroll Now
              </Link>
              <div className="text-center text-text-secondary text-sm">
                or{' '}
                <Link to="/contact" className="text-primary-300 hover:text-primary-hover">
                  contact us for more info
                </Link>
              </div>
            </div>

            {/* Course Info */}
            <div className="bg-surface-elevated rounded-2xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Course Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Level:</span>
                  <span className="text-text-primary">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Duration:</span>
                  <span className="text-text-primary">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Mode:</span>
                  <span className="text-text-primary">{course.mode}</span>
                </div>
                {course.prerequisites && (
                  <div>
                    <span className="text-text-secondary">Prerequisites:</span>
                    <p className="text-text-primary mt-1">{course.prerequisites}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;