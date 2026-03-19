import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import List "mo:core/List";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // Types
  type Project = {
    id : Text;
    title : Text;
    description : Text;
    purpose : Text;
    imageId : ?Text;
    link : ?Text;
    year : Nat;
    created : Time.Time;
    updated : Time.Time;
  };

  module Project {
    public func compare(p1 : Project, p2 : Project) : Order.Order {
      Text.compare(p1.title, p2.title);
    };
  };

  type Skill = {
    id : Text;
    name : Text;
    level : ?Text;
    imageId : ?Text;
    created : Time.Time;
    updated : Time.Time;
  };

  module Skill {
    public func compare(s1 : Skill, s2 : Skill) : Order.Order {
      Text.compare(s1.name, s2.name);
    };
  };

  type Certificate = {
    id : Text;
    title : Text;
    year : ?Nat;
    imageId : ?Text;
    created : Time.Time;
    updated : Time.Time;
  };

  module Certificate {
    public func compare(c1 : Certificate, c2 : Certificate) : Order.Order {
      Text.compare(c1.title, c2.title);
    };
  };

  type Profile = {
    name : Text;
    title : Text;
    bio : Text;
    profileImageId : ?Text;
  };

  type Contact = {
    linkedin : Text;
    email : Text;
    instagram : Text;
    telegram : Text;
  };

  // Storage
  let projects = Map.empty<Text, Project>();
  let skills = Map.empty<Text, Skill>();
  let certificates = Map.empty<Text, Certificate>();

  // Static Data
  var profile : Profile = {
    name = "Vichu";
    title = "Mechanical Engineering Student | Product Builder";
    bio = "Focused on building meaningful and user-centric digital experiences";
    profileImageId = null;
  };

  var contact : Contact = {
    linkedin = "https://www.linkedin.com/in/dinesh-karthik-1353173b8";
    email = "dineshkarthik.dev26@gmail.com";
    instagram = "@blackberryhub.in";
    telegram = "@classicberrymoon";
  };

  // PROJECTS
  public query func getProjects() : async [Project] {
    projects.values().toArray().sort();
  };

  public shared ({ caller }) func addProject(project : Project) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add projects");
    };
    projects.add(project.id, project);
  };

  public shared ({ caller }) func updateProject(project : Project) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update projects");
    };
    projects.add(project.id, project);
  };

  public shared ({ caller }) func deleteProject(id : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete projects");
    };
    projects.remove(id);
  };

  // SKILLS
  public query func getSkills() : async [Skill] {
    skills.values().toArray().sort();
  };

  public shared ({ caller }) func addSkill(skill : Skill) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add skills");
    };
    skills.add(skill.id, skill);
  };

  public shared ({ caller }) func updateSkill(skill : Skill) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update skills");
    };
    skills.add(skill.id, skill);
  };

  public shared ({ caller }) func deleteSkill(id : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete skills");
    };
    skills.remove(id);
  };

  // CERTIFICATES
  public query func getCertificates() : async [Certificate] {
    certificates.values().toArray().sort();
  };

  public shared ({ caller }) func addCertificate(certificate : Certificate) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add certificates");
    };
    certificates.add(certificate.id, certificate);
  };

  public shared ({ caller }) func updateCertificate(certificate : Certificate) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update certificates");
    };
    certificates.add(certificate.id, certificate);
  };

  public shared ({ caller }) func deleteCertificate(id : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete certificates");
    };
    certificates.remove(id);
  };

  // PROFILE & CONTACT
  public query func getProfile() : async Profile {
    profile;
  };

  public shared ({ caller }) func updateProfile(newProfile : Profile) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update profile");
    };
    profile := newProfile;
  };

  public query func getContact() : async Contact {
    contact;
  };

  public shared ({ caller }) func updateContact(newContact : Contact) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update contact");
    };
    contact := newContact;
  };
};
